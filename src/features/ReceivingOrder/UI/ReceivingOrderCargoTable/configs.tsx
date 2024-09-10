/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";
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
            dimensions: string;
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
                    component: ({ control }) =>
                        getReceivingOrderGoodAutocomplete(control, receivingOrderId),
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("barcode", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderCargo:properties.barcode"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue } }) => {
                        return (
                            <Controller
                                name="barcode"
                                control={control}
                                rules={{ required: true }}
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
                    component: ({ register, error, row: { setValue, getValue } }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("packageQuantity", {
                                    required: true,
                                    min: 0,
                                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                        setValue(
                                            "totalQuantity",
                                            parseFloat(e.target.value) *
                                                getValue("conversionQuantity")
                                        );
                                    },
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
                    component: ({ register, error, row: { getValue, setValue } }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("conversionQuantity", {
                                    required: true,
                                    min: 0,
                                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                        setValue(
                                            "totalQuantity",
                                            parseFloat(e.target.value) * getValue("packageQuantity")
                                        );
                                    },
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
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderCargo:properties.totalQuantity"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("totalQuantity", { required: true, min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("dimensions", {
            cell: ({ row }) => (
                <DimensionsLink
                    defaultValue={{
                        length: row.original.length ?? 0,
                        width: row.original.width ?? 0,
                        height: row.original.height ?? 0,
                        volume: row.original.volume ?? 0,
                        weight: row.original.weight ?? 0,
                    }}
                    permissionPath="ReceivingOrder.ReceivingOrderCargo"
                />
            ),
            header: t("ReceivingOrderCargo:properties.dimensions"),
            meta: {
                editableCell: {
                    component: ({ control, row }) => {
                        return (
                            <Controller
                                name="dimensions"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <DimensionsLink
                                        onChange={onChange}
                                        defaultValue={{
                                            length: row.original.length ?? 0,
                                            width: row.original.width ?? 0,
                                            height: row.original.height ?? 0,
                                            volume: row.original.volume ?? 0,
                                            weight: row.original.weight ?? 0,
                                        }}
                                        externalValue={value}
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

function getReceivingOrderGoodAutocomplete(control: Control, receivingOrderId: string) {
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
                    onValueChange={onChange}
                    useSorting={false}
                    dictionaryParams={{
                        type: DictionaryType.RECEIVING_ORDER_GOOD,
                        filter: (value) => ({
                            code: {
                                type: SEARCH_TYPE.CONTAINS,
                                content: value,
                                byOr: true,
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
