/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { ITermOfRequestedService } from "src/features/TermOfService/store/TermOfRequestedServiceStore";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IShippingOrderRequestedService } from "../../store/ShippingOrderRequestedServiceStore";

export const getPlannedQuantity = (
    requestedService: ITermOfRequestedService | undefined,
    cargoCount: number
) => {
    if (!requestedService?.calculationMethod) {
        return null;
    }

    if (requestedService?.calculationMethod === "REQUEST") {
        return 1;
    } else {
        return cargoCount;
    }
};

const columnHelper = createColumnHelper<WithGridRowId<IShippingOrderRequestedService>>();

export const getColumns = (cargoCount: number) => {
    return [
        columnHelper.accessor("termOfRequestedService", {
            cell: (params) => params.getValue()?.code,
            header: t("ShippingOrderRequestedService:properties.code"),
            meta: {
                editableCell: {
                    component: ({ control, row: { setValue } }) => {
                        return (
                            <Controller
                                name="termOfRequestedService"
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
                                        testFieldName="termOfRequestedService"
                                        renderValuePrimary="code"
                                        onValueChange={(data: any) => {
                                            setValue("rate", data?.rate ?? 0);
                                            setValue("unitOfMeasure", data?.unitOfMeasure ?? null);

                                            console.log(cargoCount);
                                            const withoutVat = data
                                                ? getPlannedQuantity(
                                                      data as ITermOfRequestedService,
                                                      cargoCount
                                                  ) ?? 0 * data?.rate
                                                : 0;
                                            setValue("priceWithoutVAT", withoutVat);
                                            setValue("priceWithVAT", withoutVat * 1.2);
                                            onChange(data);
                                        }}
                                        dictionaryParams={{
                                            type: DictionaryType.TERM_OF_REQUESTED_SERVICE,
                                            filter: { active: true, clientOrderType: "SHIPMENT" },
                                        }}
                                        useSorting={false}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("unitOfMeasure", {
            cell: ({ row }) => (row.getValue("unitOfMeasure") as { code: string })?.code,
            header: t("ShippingOrderRequestedService:properties.unitOfMeasure"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("plannedQuantity", {
            cell: ({ row: { getValue: editableValue }, getValue }) => {
                return (
                    getValue?.() ??
                    getPlannedQuantity(
                        editableValue("termOfRequestedService") as ITermOfRequestedService,
                        cargoCount
                    ) ??
                    editableValue("plannedQuantity")
                );
            },
            header: t("ShippingOrderRequestedService:properties.plannedQuantity"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),

        columnHelper.accessor("rate", {
            cell: ({ row }) => row.getValue("rate"),
            header: t("ShippingOrderRequestedService:properties.rate"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("priceWithoutVAT", {
            cell: ({ row }) => row.getValue("priceWithoutVAT"),
            header: t("ShippingOrderRequestedService:properties.withoutVAT"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("priceWithVAT", {
            cell: ({ row }) => row.getValue("priceWithVAT"),
            header: t("ShippingOrderRequestedService:properties.withVAT"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("actualQuantity", {
            cell: (params) => params.getValue() ?? 0,
            header: t("ShippingOrderRequestedService:properties.actualQuantity"),
        }),
    ];
};
