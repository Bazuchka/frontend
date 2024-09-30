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
import { IShippingOrderRailwayCarriage } from "../../store/ShippingOrderRailwayCarriageStore/ShippingOrderRailwayCarriageStore";
import { ShippingOrderRailwayCarriageForm } from "./ShippingOrderRailwayCarriageForm";

const columnHelper = createColumnHelper<WithGridRowId<IShippingOrderRailwayCarriage>>();

export const getColumns = (shippingOrderId: string, clientId: string) => () => {
    return [
        columnHelper.accessor("shippingOrderEtranInvoice", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("ShippingOrderRailwayCarriage:properties.etranInvoice"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="shippingOrderEtranInvoice"
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
                                            type: DictionaryType.SHIPPING_ORDER_ETRAN_INVOICE,
                                            filter: {
                                                active: true,
                                                shippingOrder: {
                                                    id: shippingOrderId,
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
            header: t("ShippingOrderRailwayCarriage:properties.railwayCarriage"),
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
                                                        notUsedInShippingOrder: shippingOrderId,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <AlisForm
                                                id={getValue("railwayCarriage")?.id?.toString()}
                                                store={
                                                    //TODO Replace to shippingOrderRailwayCarriage.current.railwayCarriageStore
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
                                                    ShippingOrderRailwayCarriageForm
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
            header: t("ShippingOrderRailwayCarriage:properties.type"),
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
            header: t("ShippingOrderRailwayCarriage:properties.liftingCapacity"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
    ];
};
