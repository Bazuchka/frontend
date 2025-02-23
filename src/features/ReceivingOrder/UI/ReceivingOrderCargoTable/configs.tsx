/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Control, Controller, FieldValues, UseFormSetValue } from "react-hook-form";
import { DimensionsLink } from "src/features/common/DimensionsLink";
import { GoodPackageColumn } from "src/features/common/GoodPackage";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IReceivingOrderCargo } from "../../store/ReceivingOrderCargoStore";

const columnHelper = createColumnHelper<
    WithGridRowId<
        IReceivingOrderCargo & {
            batch: string;
        }
    >
>();

export const getColumns = (receivingOrderId: string) => () => {
    return [
        columnHelper.accessor("receivingOrderGood", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderCargo:properties.receivingOrderGood"),
            size: 300,
            meta: {
                editableCell: {
                    component: ({ control, row: { setValue } }) =>
                        getReceivingOrderGoodAutocomplete(control, receivingOrderId, setValue),
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("batch", {
            cell: ({ row }) =>
                (row.getValue("receivingOrderGood") as { batch: { code: string } })?.batch?.code ??
                row.original.receivingOrderGood?.batch?.code,
            header: t("ReceivingOrderCargo:properties.batch"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("barcode", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderCargo:properties.barcode"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue, original } }) => {
                        return (
                            <Controller
                                name="barcode"
                                control={control}
                                // rules={{ required: true }} // todo: Убрано для демонстрации. Провести через аналитику.
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        isDisable={!getValue("receivingOrderGood")}
                                        error={invalid}
                                        value={value}
                                        onValueChange={onChange}
                                        dictionaryParams={{
                                            type: DictionaryType.GOOD_PACKAGE_BARCODE,
                                            filter: {
                                                goodVariant: {
                                                    id:
                                                        getValue("receivingOrderGood")?.clientGood
                                                            ?.id ?? original?.clientGood?.id,
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("goodPackage", {
            cell: (params) => params.getValue().code,
            header: t("ReceivingOrderCargo:properties.goodPackage"),
            meta: {
                editableCell: {
                    component: (componentProps) => {
                        return (
                            <GoodPackageColumn
                                isDisablePropName="receivingOrderGood"
                                {...componentProps}
                                filter={{
                                    clientGood: {
                                        id:
                                            componentProps.row.getValue("receivingOrderGood")
                                                ?.clientGood?.id ??
                                            componentProps.row.original?.clientGood?.id,
                                    },
                                }}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("packageQuantity", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderCargo:properties.packageQuantity"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("packageQuantity", {
                                    required: true,
                                    min: 0,
                                })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("conversionQuantity", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderCargo:properties.conversionQuantity"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("conversionQuantity", {
                                    required: true,
                                    min: 0,
                                })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("totalQuantity", {
            cell: ({ row }) =>
                parseFloat(row.getValue("packageQuantity") || ("0" as string)) *
                parseFloat(row.getValue("conversionQuantity") || ("0" as string)),
            header: t("ReceivingOrderCargo:properties.totalQuantity"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("dimensions", {
            cell: ({ row }) => (
                <DimensionsLink
                    value={row.original.dimensions}
                    permissionPath="ReceivingOrder.ReceivingOrderCargo"
                />
            ),
            header: t("ReceivingOrderCargo:properties.dimensions"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="dimensions"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <DimensionsLink
                                        onChange={onChange}
                                        value={value}
                                        permissionPath="ReceivingOrder.ReceivingOrderCargo"
                                        invalid={invalid}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.BUTTON,
                },
            },
        }),
    ];
};

function getReceivingOrderGoodAutocomplete(
    control: Control,
    receivingOrderId: string,
    setValue: UseFormSetValue<FieldValues>
) {
    return (
        <Controller
            name="receivingOrderGood"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                <AutocompleteSelectOfDictionary
                    isDisable={false}
                    error={invalid}
                    value={value}
                    onValueChange={(data) => {
                        setValue("goodPackage", null);
                        onChange(data);
                    }}
                    useSorting={false}
                    dictionaryParams={{
                        type: DictionaryType.RECEIVING_ORDER_GOOD,
                        filter: (value) => ({
                            clientGood: {
                                code: {
                                    type: SEARCH_TYPE.CONTAINS,
                                    content: value,
                                    byOr: true,
                                },
                                name: {
                                    type: SEARCH_TYPE.CONTAINS,
                                    content: value,
                                    byOr: true,
                                },
                                item: {
                                    type: SEARCH_TYPE.CONTAINS,
                                    content: value,
                                    byOr: true,
                                },
                                variantItem: {
                                    type: SEARCH_TYPE.CONTAINS,
                                    content: value,
                                    byOr: true,
                                },
                            },
                            active: true,
                            deleted: false,
                            receivingOrder: {
                                id: receivingOrderId,
                            },
                        }),
                    }}
                />
            )}
        />
    );
}
