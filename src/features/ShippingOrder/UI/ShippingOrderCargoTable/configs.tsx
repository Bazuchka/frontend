/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";
import { IGoodPackage } from "src/features/ClientGood/store/GoodPackageStore";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { DimensionsLink } from "../../../common/DimensionsLink";
import { IShippingOrderCargo } from "../../store/ShippingOrderCargoStore";

const columnHelper = createColumnHelper<
    WithGridRowId<
        IShippingOrderCargo & {
            dimensions: string;
            batch: string;
        }
    >
>();

export const getColumns = (shippingOrderId: string) => () => {
    return [
        columnHelper.accessor("shippingOrderGood", {
            cell: (params) => params.getValue()?.code,
            header: t("ShippingOrderCargo:properties.shippingOrderGood"),
            size: 240,
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="shippingOrderGood"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        onValueChange={onChange}
                                        useSorting={false}
                                        dictionaryParams={{
                                            type: DictionaryType.SHIPPING_ORDER_GOOD,
                                            filter: {
                                                active: true,
                                                deleted: false,
                                                shippingOrder: {
                                                    id: shippingOrderId,
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
        columnHelper.accessor("batch", {
            cell: ({ row }) =>
                (row.getValue("shippingOrderGood") as { batch: { code: string } })?.batch?.code,
            header: t("ShippingOrderCargo:properties.batch"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("barcode", {
            cell: (params) => params.getValue()?.code,
            header: t("ShippingOrderCargo:properties.barcode"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="barcode"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        isDisable={false}
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
            header: t("ShippingOrderCargo:properties.goodPackage"),
            meta: {
                editableCell: {
                    component: ({ control, row: { setValue } }) => {
                        return GoodPackage(control, setValue);
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("packageQuantity", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderCargo:properties.packageQuantity"),
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
            header: t("ShippingOrderCargo:properties.conversionQuantity"),
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
            header: t("ShippingOrderCargo:properties.totalQuantity"),
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
                    permissionPath="ShippingOrder.ShippingOrderCargo"
                />
            ),
            header: t("ShippingOrderCargo:properties.dimensions"),
            meta: {
                editableCell: {
                    component: ({ control, row }) => {
                        return (
                            <Controller
                                name="dimensions"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange } }) => (
                                    <DimensionsLink
                                        onChange={onChange}
                                        defaultValue={{
                                            length: row.original.length ?? 0,
                                            width: row.original.width ?? 0,
                                            height: row.original.height ?? 0,
                                            volume: row.original.volume ?? 0,
                                            weight: row.original.weight ?? 0,
                                        }}
                                        permissionPath="ShippingOrder.ShippingOrderCargo"
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

// TODO move as shared component for tables
function GoodPackage(control: Control, setValue: (fieldName: string, data: any) => void) {
    return (
        <Controller
            name="goodPackage"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                <AutocompleteSelectOfDictionary
                    isDisable={false}
                    error={invalid}
                    value={value}
                    onValueChange={(data) => {
                        setValue(
                            "conversionQuantity",
                            (data as IGoodPackage).conversionQty ?? 1 // TODO Create ticket if goodpacakge/all doesn't have this field
                        );
                        onChange(data);
                    }}
                    dictionaryParams={{
                        type: DictionaryType.GOOD_PACKAGE,
                    }}
                />
            )}
        />
    );
}
