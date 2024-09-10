import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IUserRole } from "../../store/UserRoleStore";

const columnHelper = createColumnHelper<WithGridRowId<IUserRole>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => {
                return params.getValue();
            },
            header: t("User:properties.role"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="role"
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
                                        onValueChange={onChange}
                                        renderValuePrimary="code"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        dictionaryParams={{
                                            type: DictionaryType.ROLE,
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
