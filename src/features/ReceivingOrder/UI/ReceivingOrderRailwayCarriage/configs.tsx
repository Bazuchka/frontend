import { Grid } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import railwayCarriageStore from "src/features/RailwayCarriage/store";
import { AlisForm, CreateButton, EditButton } from "src/features/common/AlisForm";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IReceivingOrderRailwayCarriage } from "../../store/ReceivingOrderRailwayCarriageStore/ReceivingOrderRailwayCarriageStore";
import { ReceivingOrderRailwayCarriageForm } from "./ReceivingOrderRailwayCarriageForm";

const columnHelper = createColumnHelper<WithGridRowId<IReceivingOrderRailwayCarriage>>();

export const getColumns = (receivingOrderId: string, clientId: string) => () => {
    return [
        columnHelper.accessor("receivingOrderEtranInvoice", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ReceivingOrderRailwayCarriage:properties.etranInvoice"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="receivingOrderEtranInvoice"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        error={invalid}
                                        value={value}
                                        renderValuePrimary="code"
                                        onValueChange={onChange}
                                        useSorting={false}
                                        dictionaryParams={{
                                            type: DictionaryType.RECEIVING_ORDER_ETRAN_INVOICE,
                                            filter: {
                                                active: true,
                                                receivingOrder: {
                                                    id: receivingOrderId,
                                                },
                                                etranInvoice: {
                                                    code: {
                                                        type: SEARCH_TYPE.NOT_EMPTY,
                                                        byOr: true,
                                                    },
                                                },
                                                deleted: false,
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
        columnHelper.accessor("railwayCarriage", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ReceivingOrderRailwayCarriage:properties.railwayCarriage"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue, setValue } }) => {
                        return (
                            <Controller
                                name="railwayCarriage"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <Grid
                                        container
                                        alignContent="center"
                                        justifyContent="space-between">
                                        <Grid item xs={9}>
                                            <AutocompleteSelectOfDictionary
                                                error={invalid}
                                                value={value}
                                                renderValuePrimary="code"
                                                onValueChange={onChange}
                                                useDefaultFilter={true}
                                                dictionaryParams={{
                                                    type: DictionaryType.RAILWAY_CARRIAGE,
                                                    filter: {
                                                        active: true,
                                                        client: {
                                                            id: clientId,
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <AlisForm
                                                id={getValue("railwayCarriage")?.id?.toString()}
                                                store={
                                                    //TODO Replace to receivingOrderRailwayCarriage.current.railwayCarriageStore
                                                    railwayCarriageStore
                                                }
                                                allowCreate={true}
                                                allowEdit={
                                                    getValue("railwayCarriage") &&
                                                    getValue("railwayCarriage").id
                                                }
                                                createActionComponents={CreateButton}
                                                editActionComponents={EditButton}
                                                componentProps={{
                                                    setValue: setValue,
                                                    getValue: getValue,
                                                }}
                                                component={
                                                    ReceivingOrderRailwayCarriageForm
                                                }></AlisForm>
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
        columnHelper.accessor("type", {
            cell: ({ row: { getValue } }) => {
                return (getValue("railwayCarriage") as { type: { code: string } })?.type?.code;
            },
            header: t("ReceivingOrderRailwayCarriage:properties.type"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("railwayCarriage", {
            cell: ({ row: { getValue } }) => {
                return (getValue("railwayCarriage") as { liftingCapacity: string })
                    ?.liftingCapacity;
            },
            header: t("ReceivingOrderRailwayCarriage:properties.liftingCapacity"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
    ];
};
