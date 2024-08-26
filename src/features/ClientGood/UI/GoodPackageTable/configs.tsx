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
import { IGoodPackage } from "../../store/GoodPackageStore";

const columnHelper = createColumnHelper<WithGridRowId<IGoodPackage>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.code"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("code", { required: true })}
                                multiline={true}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT,
                },
            },
        }),
        columnHelper.accessor("unitOfMeasure", {
            cell: (params) => params.getValue().code,
            header: t("GoodPackage:properties.unitOfMeasure"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="unitOfMeasure"
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
                                        dictionaryParams={{ type: DictionaryType.UNIT_OF_MEASURE }}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("processingType", {
            cell: (params) =>
                params.getValue() ? t(`ProcessingType:types.${params.getValue()}`) : "-",
            header: t("GoodPackage:properties.processingType"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="processingType"
                                control={control}
                                rules={{ required: false }}
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
                                            type: DictionaryType.PROCESSING_TYPE,
                                        }}
                                        translatePath={"ProcessingType:types"}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("conversionQty", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.conversionQty"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("conversionQty", { required: true })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("level", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.level"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("level", { required: true, min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("length", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.length"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("length", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("width", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.width"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("width", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("height", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.height"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("height", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("volume", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.volume"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("volume", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("weight", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.weight"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("weight", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("tareWeight", {
            cell: (params) => params.getValue(),
            header: t("GoodPackage:properties.tareWeight"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                type="number"
                                size="small"
                                {...register("tareWeight", { min: 0 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT_NUMBER,
                },
            },
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("GoodPackage:properties.active"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("active")}
                                error={!!error}
                                defaultChecked={row.original.active}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
    ];
};
