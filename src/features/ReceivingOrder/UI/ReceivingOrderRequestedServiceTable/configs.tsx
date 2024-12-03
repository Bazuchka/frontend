/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { ITermOfRequestedService } from "src/features/TermOfService/store/TermOfRequestedServiceStore";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IReceivingOrderRequestedService } from "../../store/ReceivingOrderRequestedService";

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

const columnHelper = createColumnHelper<WithGridRowId<IReceivingOrderRequestedService>>();

export const getColumns = (cargoCount: number) => {
    return [
        columnHelper.accessor("termOfRequestedService", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderRequestedService:properties.code"),
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
                                        renderValuePrimary="code"
                                        testFieldName="termOfRequestedService"
                                        onValueChange={(data: any) => {
                                            setValue("rate", data?.rate ?? 0);
                                            setValue("unitOfMeasure", data?.unitOfMeasure ?? null);

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
                                            filter: { active: true, clientOrderType: "RECEIVING" },
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
            header: t("ReceivingOrderRequestedService:properties.unitOfMeasure"),
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
            header: t("ReceivingOrderRequestedService:properties.plannedQuantity"),
            meta: {
                isComputed: true,
            },
            enableSorting: false,
        }),

        columnHelper.accessor("rate", {
            cell: ({ row }) => row.getValue("rate"),
            header: t("ReceivingOrderRequestedService:properties.rate"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("priceWithoutVAT", {
            cell: ({ row }) => row.getValue("priceWithoutVAT"),
            header: t("ReceivingOrderRequestedService:properties.withoutVAT"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("priceWithVAT", {
            cell: ({ row }) => row.getValue("priceWithVAT"),
            header: t("ReceivingOrderRequestedService:properties.withVAT"),
            meta: {
                isComputed: true,
            },
        }),
        columnHelper.accessor("actualQuantity", {
            cell: ({ row }) => row.getValue("actualQuantity"),
            header: t("ReceivingOrderRequestedService:properties.actualQuantity"),
            meta: {
                isComputed: true,
            },
        }),
    ];
};
