import { Checkbox, SvgIcon, TextField } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { CheckIcon } from "src/assets/svg";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IGoodPackageBarcode } from "../../store/GoodPackageBarcodeStore";

const columnHelper = createColumnHelper<WithGridRowId<IGoodPackageBarcode>>();

export const getColumns = (clientGoodId?: string) => {
    return [
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("GoodPackageBarcode:properties.active"),
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
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("GoodPackageBarcode:properties.code"),
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
        columnHelper.accessor("goodPackage", {
            cell: (params) => params.getValue().code,
            header: t("GoodPackageBarcode:properties.goodPackage"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="goodPackage"
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
                                            type: DictionaryType.GOOD_PACKAGE,
                                            filter: {
                                                clientGood: {
                                                    id: clientGoodId,
                                                },
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
    ];
};
