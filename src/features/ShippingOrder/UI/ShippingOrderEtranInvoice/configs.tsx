import { Grid } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import etranInvoiceStore from "src/features/EtranInvoice/store";
import { AlisForm, CreateButton, EditButton } from "src/features/common/AlisForm";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IFullShippingOrderEtranInvoice } from "../../store/ShippingOrderEtranInvoiceStore/ShippingOrderEtranInvoiceStore";
import { ShippingOrderEtranInvoiceForm } from "./ShippingOrderEtranInvoiceForm";

const columnHelper = createColumnHelper<WithGridRowId<IFullShippingOrderEtranInvoice>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("etranInvoice", {
            cell: (params) => {
                return params.getValue()?.code ?? t("ShippingOrderEtranInvoice:default.code");
            },
            header: t("ShippingOrderEtranInvoice:properties.etranInvoice"),
            meta: {
                editableCell: {
                    component: ({ control, row: { getValue, setValue } }) => {
                        return (
                            <Controller
                                name="etranInvoice"
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
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                onValueChange={(data: any) => {
                                                    console.log(data);
                                                    setValue("shipper", data?.shipper);
                                                    onChange(data);
                                                }}
                                                defaultNullValue={t(
                                                    "ShippingOrderEtranInvoice:default.code"
                                                )}
                                                useDefaultFilter={true}
                                                dictionaryParams={{
                                                    type: DictionaryType.ETRAN_INVOICE,
                                                    filter: {
                                                        active: true,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <AlisForm
                                                id={getValue("etranInvoice")?.id?.toString()}
                                                store={
                                                    //TODO Replace to shippingOrderEtranInvoice.current.etranInvoiceStore
                                                    etranInvoiceStore
                                                }
                                                allowCreate={true}
                                                allowEdit={
                                                    getValue("etranInvoice") &&
                                                    getValue("etranInvoice").id
                                                }
                                                createActionComponents={CreateButton}
                                                editActionComponents={EditButton}
                                                componentProps={{
                                                    setValue: setValue,
                                                    getValue: getValue,
                                                }}
                                                component={
                                                    ShippingOrderEtranInvoiceForm
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
        columnHelper.accessor("shipper", {
            cell: ({ row: { getValue } }) => {
                return (getValue("etranInvoice") as { shipper: { code: string } })?.shipper?.code;
            },
            header: t("ShippingOrderEtranInvoice:properties.shipper"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("departureStation", {
            cell: ({ row: { getValue } }) => {
                const value = getValue("etranInvoice") as {
                    departureStation: { code: string; name: string };
                };
                return value?.departureStation?.name || value?.departureStation?.code;
            },
            header: t("ShippingOrderEtranInvoice:properties.departureStation"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
        columnHelper.accessor("destinationStation", {
            cell: ({ row: { getValue } }) => {
                const value = getValue("etranInvoice") as {
                    destinationStation: { code: string; name: string };
                };
                return value?.destinationStation?.name || value?.destinationStation?.code;
            },
            header: t("ShippingOrderEtranInvoice:properties.destinationStation"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),
    ];
};
