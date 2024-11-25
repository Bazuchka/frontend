import { TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { SEARCH_TYPE } from "src/shared/enums";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { SortingDirection } from "src/shared/request/types";
import { IReceivingOrderContainerItem } from "../../store/ReceivingOrderContainerItemStore";

const columnHelper = createColumnHelper<WithGridRowId<IReceivingOrderContainerItem>>();

export const getColumns = (receivingOrderId: string) => {
    return [
        columnHelper.accessor("receivingOrderContainer", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderContainerItem:properties.container"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="receivingOrderContainer"
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
                                        onValueChange={(data) => onChange(data)}
                                        useDefaultFilter={false}
                                        testFieldName="receivingOrderContainer"
                                        dictionaryParams={{
                                            type: DictionaryType.RECEIVING_ORDER_CONTAINER,

                                            filter: (value) => ({
                                                receivingOrder: {
                                                    id: receivingOrderId,
                                                },
                                                container: {
                                                    code: {
                                                        type: SEARCH_TYPE.LIKE,
                                                        content: value,
                                                        byOr: true,
                                                    },
                                                },
                                                empty: false,
                                                deleted: false,
                                                sortingColumn: "container.code",
                                                sortingDirection: SortingDirection.ASC,
                                            }),
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
        columnHelper.accessor("etsngCode", {
            cell: (params) => `${params.getValue().name} (${params.getValue().code})`,
            header: t("ReceivingOrderContainerItem:properties.ETSNGCode"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="etsngCode"
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
                                        testFieldName="etsngCode"
                                        onValueChange={(data) => onChange(data)}
                                        dictionaryParams={{ type: DictionaryType.ETSNGCODE }}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("description", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderContainerItem:properties.description"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("description", { required: true })}
                                error={!!error}
                                data-test-id="value:description"
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT,
                },
            },
        }),
        columnHelper.accessor("price", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderContainerItem:properties.price"),
            meta: {
                isComputed: true,
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                type="number"
                                {...register("price", { required: true })}
                                error={!!error}
                                data-test-id="value:price"
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
