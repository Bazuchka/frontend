import { TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { ITermOfPeriodicService } from "../../store/TermOfPeriodicServiceStore";

const columnHelper = createColumnHelper<WithGridRowId<ITermOfPeriodicService>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("service", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfPeriodicService:properties.service"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="service"
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
                                        dictionaryParams={{ type: DictionaryType.SERVICE }}
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
            cell: (params) => params.getValue()?.code,
            header: t("TermOfPeriodicService:properties.unitOfMeasure"),
        }),
        columnHelper.accessor("frequencyOfServices", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfPeriodicService:properties.frequencyOfServices"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="frequencyOfServices"
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
                                        dictionaryParams={{
                                            type: DictionaryType.FREQUENCY_OF_SERVICES,
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
        columnHelper.accessor("rate", {
            cell: (params) => params.getValue(),
            header: t("TermOfPeriodicService:properties.rate"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("rate", { required: true })}
                                type="number"
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
