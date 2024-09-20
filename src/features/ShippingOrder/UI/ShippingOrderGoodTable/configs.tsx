import { Grid, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import batchStore from "src/features/Batch/store";
import { AlisForm, CreateButton } from "src/features/common/AlisForm";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IFullShippingOrderGood } from "../../store/ShippingOrderGoodStore/ShippingOrderGoodStore";
import shippingOrderStore from "../../store/ShippingOrderStore";
import { ShippingOrderGoodBatchForm } from "./ShippingOrderGoodBatchForm";

const columnHelper = createColumnHelper<WithGridRowId<IFullShippingOrderGood>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("clientGood", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ShippingOrderGood:properties.good.article"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue, setValue } }) => {
                        return (
                            <Controller
                                name="clientGood"
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
                                        renderValuePrimary="code"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        onValueChange={(data: any) => {
                                            setValue("price", data?.price ?? 0);
                                            setValue("unitOfMeasure", data?.unitOfMeasure);
                                            setValue("goodVariant", null);
                                            setValue("batch", null);
                                            setValue(
                                                "totalPrice",
                                                data?.price * getValue("plannedQuantity")
                                            );
                                            onChange(data);
                                        }}
                                        dictionaryParams={{
                                            type: DictionaryType.CLIENT_GOOD,
                                            filter: {
                                                active: true,
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
        columnHelper.accessor("clientGood", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { code: string; name: string })?.code;
            },
            header: t("ShippingOrderGood:properties.good.name"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("goodVariant", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ShippingOrderGood:properties.goodVariant"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue } }) => {
                        return (
                            <Controller
                                name="goodVariant"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        isDisable={!getValue("clientGood")}
                                        error={invalid}
                                        value={value}
                                        renderValuePrimary="code"
                                        onValueChange={onChange}
                                        dictionaryParams={{
                                            type: DictionaryType.GOOD_VARIANT,
                                            filter: {
                                                active: true,
                                                clientGood: getValue("clientGood"),
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
            cell: (params) => params.getValue()?.code,
            header: t("ShippingOrderGood:properties.batch"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ row: { getValue, setValue }, control }) => {
                        return (
                            <Controller
                                name="batch"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <Grid
                                        container
                                        alignContent="center"
                                        justifyContent="space-between">
                                        <Grid item xs={8}>
                                            <AutocompleteSelectOfDictionary
                                                isDisable={!getValue("clientGood")}
                                                error={invalid}
                                                value={value}
                                                renderValuePrimary="code"
                                                onValueChange={(data) => onChange(data)}
                                                dictionaryParams={{
                                                    type: DictionaryType.BATCH,
                                                    filter: {
                                                        active: true,
                                                        clientGood: getValue("clientGood"),
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <AlisForm
                                                id={getValue("batch")?.id}
                                                store={
                                                    shippingOrderStore.current?.shippingOrderGood
                                                        .current?.shippingOrderGoodBatch ||
                                                    batchStore
                                                }
                                                allowCreate={
                                                    getValue("clientGood") &&
                                                    getValue("clientGood").code
                                                }
                                                createActionComponents={CreateButton}
                                                componentProps={{
                                                    setValue: setValue,
                                                    getValue: getValue,
                                                }}
                                                component={ShippingOrderGoodBatchForm}></AlisForm>
                                        </Grid>
                                    </Grid>
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("unitOfMeasure", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { unitOfMeasure: { code: string } })
                    ?.unitOfMeasure?.code;
            },
            header: t("ShippingOrderGood:properties.unitOfMeasure"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("plannedQuantity", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderGood:properties.plannedQuantity"),
            meta: {
                editableCell: {
                    component: ({ row: { getValue, setValue }, register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("plannedQuantity", {
                                    required: true,
                                    min: 0,
                                    value: getValue("clientGood")?.price,
                                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                        setValue(
                                            "totalPrice",
                                            parseFloat(e.target.value) * getValue("price")
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
        columnHelper.accessor("price", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderGood:properties.price"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ row: { getValue, setValue }, register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("price", {
                                    required: true,
                                    min: 0,
                                    value: getValue("clientGood")?.price,
                                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                        setValue(
                                            "totalPrice",
                                            parseFloat(e.target.value) * getValue("plannedQuantity")
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
        columnHelper.accessor("totalPrice", {
            cell: ({ row }) => row.getValue("totalPrice"),
            header: t("ShippingOrderGood:properties.totalPrice"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("tempRegime", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { tempRegime: { code: string } })?.tempRegime
                    ?.code;
            },
            header: t("ShippingOrderGood:properties.tempRegime"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("dangerClass", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { dangerClass: { code: string } })?.dangerClass
                    ?.code;
            },
            header: t("ShippingOrderGood:properties.dangerClass"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("actualQuantity", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderGood:properties.actualQuantity"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                disabled={true}
                                size="small"
                                type="number"
                                {...register("actualQuantity", { required: false })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
    ];
};
