import { Grid, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import batchStore from "src/features/Batch/store";
import receivingOrderStore from "src/features/ReceivingOrder/store/ReceivingOrderStore";
import { AlisForm, CreateButton } from "src/features/common/AlisForm";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { IForeignKey } from "src/shared/entities/ForeignKey";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import {
    IClientGoodShort,
    IFullReceivingOrderGood,
} from "../../store/ReceivingOrderGood/ReceivingOrderGood";
import { ReceivingOrderGoodBatchForm } from "./ReceivingOrderGoodBatchForm";

const columnHelper = createColumnHelper<
    WithGridRowId<
        IFullReceivingOrderGood & {
            good: string;
        }
    >
>();

export const getColumns = (client: IForeignKey) => {
    return [
        columnHelper.accessor("clientGood", {
            cell: (params) => {
                return params.getValue()?.item;
            },
            header: t("ReceivingOrderGood:properties.good.article"),
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
                                    <AutocompleteSelectOfDictionary<IClientGoodShort>
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        renderValuePrimary="item"
                                        renderValueSecondary="code"
                                        useRenderValuePattern
                                        testFieldName="clientGood"
                                        onValueChange={(data) => {
                                            setValue("price", data?.price ?? 0);
                                            setValue("unitOfMeasure", data?.unitOfMeasure);
                                            setValue("goodVariant", null);
                                            setValue("batch", null);
                                            setValue(
                                                "totalPrice",
                                                data?.price ?? 0 * getValue("plannedQuantity")
                                            );
                                            onChange(data);
                                        }}
                                        dictionaryParams={{
                                            type: DictionaryType.CLIENT_GOOD,
                                            filter: {
                                                active: true,
                                                client,
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
        columnHelper.accessor("good", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { code: string; name: string })?.code;
            },
            header: t("ReceivingOrderGood:properties.good.name"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("goodVariant", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ReceivingOrderGood:properties.goodVariant"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue } }) => {
                        return (
                            <Controller
                                name="goodVariant"
                                control={control}
                                rules={{
                                    required: !!(getValue("clientGood") as IClientGoodShort)
                                        ?.isVariable,
                                }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        error={invalid}
                                        value={value}
                                        renderValuePrimary="code"
                                        testFieldName="goodVariant"
                                        onValueChange={onChange}
                                        isDisable={
                                            !(getValue("clientGood") as IClientGoodShort)
                                                ?.isVariable
                                        }
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
            header: t("ReceivingOrderGood:properties.batch"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ row: { getValue, setValue }, control }) => {
                        const isRequired = () => {
                            return getValue("clientGood")?.batchAccountingType !== "NOT_USED";
                        };
                        return (
                            <Controller
                                name="batch"
                                control={control}
                                rules={{
                                    required: isRequired(),
                                }}
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
                                                testFieldName="batch"
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
                                                    receivingOrderStore.current?.receivingOrderGood
                                                        .current?.receivingOrderGoodBatch ||
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
                                                component={ReceivingOrderGoodBatchForm}></AlisForm>
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
            header: t("ReceivingOrderGood:properties.unitOfMeasure"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("plannedQuantity", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderGood:properties.plannedQuantity"),
            meta: {
                editableCell: {
                    component: ({ row: { getValue, setValue }, register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                data-test-id="value:plannedQuantity"
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
            header: t("ReceivingOrderGood:properties.price"),
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
            header: t("ReceivingOrderGood:properties.totalPrice"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("tempRegime", {
            cell: ({ row: { getValue } }) => {
                return (getValue("clientGood") as { tempRegime: { code: string } })?.tempRegime
                    ?.code;
            },
            header: t("ReceivingOrderGood:properties.tempRegime"),
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
            header: t("ReceivingOrderGood:properties.dangerClass"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("actualQuantity", {
            cell: ({ row }) => row.original.actualQuantity,
            header: t("ReceivingOrderGood:properties.actualQuantity"),
            meta: {
                isComputed: true,
            },
        }),
    ];
};
