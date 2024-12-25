import { Checkbox, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { CheckIcon } from "src/assets/svg";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { SelectOfEnum } from "src/shared/UI/SelectOfEnum";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { ITermOfRequestedService } from "../../store/TermOfRequestedServiceStore";

const columnHelper = createColumnHelper<WithGridRowId<ITermOfRequestedService>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("service", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfRequestedService:properties.service"),
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
            header: t("TermOfRequestedService:properties.unitOfMeasure"),
        }),
        columnHelper.accessor("clientOrderType", {
            cell: (params) => t(`ClientOrderType:types.${params.getValue()}`),
            header: t("TermOfRequestedService:properties.clientOrderType"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="clientOrderType"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <SelectOfEnum
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        onChange={onChange}
                                        dictionaryParams={{
                                            type: DictionaryType.CLIENT_ORDER_TYPE,
                                        }}
                                        translatePath={"ClientOrderType:types"}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.ENUM_SELECT,
                },
            },
        }),
        columnHelper.accessor("required", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("TermOfRequestedService:properties.required"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name={"required"}
                                control={control}
                                render={({ field: props }) => (
                                    <Checkbox
                                        {...props}
                                        checked={props.value}
                                        onChange={(e) => props.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("calculationMethod", {
            cell: (params) => t(`CalculationMethod:types.${params.getValue()}`),
            header: t("TermOfRequestedService:properties.calculationMethod"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="calculationMethod"
                                control={control}
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <SelectOfEnum
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        onChange={onChange}
                                        dictionaryParams={{
                                            type: DictionaryType.CALCULATION_METHOD,
                                        }}
                                        translatePath={"CalculationMethod:types"}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.ENUM_SELECT,
                },
            },
        }),
        columnHelper.accessor("rate", {
            cell: (params) => params.getValue(),
            header: t("TermOfRequestedService:properties.rate"),
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
