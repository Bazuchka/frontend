import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IUserClient } from "../../store/UserClientStore";

const columnHelper = createColumnHelper<WithGridRowId<IUserClient>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("client", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("User:properties.client"),
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
                                        onValueChange={onChange}
                                        renderValuePrimary="code"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        dictionaryParams={{
                                            type: DictionaryType.CLIENT,
                                            filter: {
                                                active: true,
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
