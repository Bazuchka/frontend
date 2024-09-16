import { Checkbox, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { CheckIcon } from "src/assets/svg";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IClientRelatedEntity } from "./store/ClientRelatedEntityStore";

const columnHelper = createColumnHelper<WithGridRowId<IClientRelatedEntity>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.code"),
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
        columnHelper.accessor("client", {
            cell: (params) => params.getValue()?.code,
            header: t("LegalEntity:properties.client"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="client"
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
                                        dictionaryParams={{ type: DictionaryType.CLIENT }}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("inn", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.inn"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("inn", { maxLength: 12 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT,
                },
            },
        }),
        columnHelper.accessor("kpp", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.kpp"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("kpp", { maxLength: 9 })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT,
                },
            },
        }),
        columnHelper.accessor("isShipper", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("LegalEntity:properties.shipper"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("isShipper")}
                                error={!!error}
                                defaultChecked={row.original.isShipper}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("isConsignee", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("LegalEntity:properties.consignee"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("isConsignee")}
                                error={!!error}
                                defaultChecked={row.original.isConsignee}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("isCarrier", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("LegalEntity:properties.carrier"),
            meta: {
                editableCell: {
                    component: ({ row, register, error }) => {
                        return (
                            <Checkbox
                                {...register("isCarrier")}
                                error={!!error}
                                defaultChecked={row.original.isCarrier}
                            />
                        );
                    },
                    defaultValue: false,
                    fieldType: FieldItemType.CHECKBOX,
                },
            },
        }),
        columnHelper.accessor("legalEntity", {
            cell: (params) => params.getValue()?.code,
            header: t("LegalEntity:properties.legalEntity"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="legalEntity"
                                control={control}
                                rules={{ required: false }}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { invalid },
                                }) => (
                                    <AutocompleteSelectOfDictionary
                                        isDisable={false}
                                        error={invalid}
                                        value={value}
                                        onValueChange={(data) => onChange(data)}
                                        dictionaryParams={{ type: DictionaryType.LEGAL_ENTITY }}
                                    />
                                )}
                            />
                        );
                    },
                    fieldType: FieldItemType.AUTOCOMPLETE,
                },
            },
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("LegalEntity:properties.active"),
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
