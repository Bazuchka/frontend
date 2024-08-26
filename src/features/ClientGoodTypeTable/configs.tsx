import { Checkbox, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { ControlledAutoComplete } from "../common/ControlledAutocomplete";
import { IClientGoodType } from "./store/ClientGoodTypeStore";

const columnHelper = createColumnHelper<WithGridRowId<IClientGoodType>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("clientSyncId", {
            cell: (params) => params.getValue(),
            header: t("ClientGoodType:properties.clientSyncId"),
            meta: {
                editableCell: (original: IClientGoodType | null) => {
                    if (!original?.id) {
                        // show text field on create mode only
                        return {
                            component: ({ register, error }) => {
                                return (
                                    <TextField
                                        size="small"
                                        {...register("clientSyncId", { required: true })}
                                        multiline={true}
                                        error={!!error}
                                    />
                                );
                            },
                            defaultValue: "",
                            fieldType: FieldItemType.INPUT,
                        };
                    }
                },
            },
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGoodType:properties.client"),
            meta: {
                editableCell: (original: IClientGoodType | null) => {
                    if (original?.hasClientGoods) {
                        return;
                    }
                    return {
                        component: ({ control }) => {
                            return (
                                <ControlledAutoComplete
                                    name="client"
                                    control={control}
                                    rules={{ required: true }}
                                    autoCompleteProps={{ dictionaryType: DictionaryType.CLIENT }}
                                />
                            );
                        },
                        fieldType: FieldItemType.AUTOCOMPLETE,
                    };
                },
            },
        }),
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("ClientGoodType:properties.code"),
            meta: {
                editableCell: {
                    component: ({ register, error }) => {
                        return (
                            <TextField
                                size="small"
                                {...register("code", { required: true })}
                                error={!!error}
                            />
                        );
                    },
                    defaultValue: "",
                    fieldType: FieldItemType.INPUT,
                },
            },
        }),
        columnHelper.accessor("isVariable", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientGoodType:properties.isVariable"),
            meta: {
                editableCell: (original: IClientGoodType | null) => {
                    if (original?.hasClientGoods) {
                        return;
                    }
                    return {
                        component: ({ row: { original }, register, error }) => {
                            return (
                                <Checkbox
                                    {...register("isVariable")}
                                    error={!!error}
                                    defaultChecked={original.isVariable}
                                />
                            );
                        },
                        defaultValue: false,
                        fieldType: FieldItemType.CHECKBOX,
                    };
                },
            },
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientGoodType:properties.active"),
            meta: {
                editableCell: (original: IClientGoodType | null) => {
                    if (original?.hasClientGoods) {
                        return;
                    }

                    return {
                        component: ({ row: { original }, register, error }) => {
                            return (
                                <Checkbox
                                    {...register("active")}
                                    error={!!error}
                                    defaultChecked={original.active}
                                />
                            );
                        },
                        defaultValue: false,
                        fieldType: FieldItemType.CHECKBOX,
                    };
                },
            },
        }),
    ];
};
