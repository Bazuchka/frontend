import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Controller } from "react-hook-form";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { IUserLegalEntity } from "../../store/UserLegalEntityStore";

const columnHelper = createColumnHelper<WithGridRowId<IUserLegalEntity>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("legalEntity", {
            cell: (params) => {
                return params.getValue()?.code;
            },
            header: t("User:properties.legalEntity"),
            meta: {
                editableCell: {
                    component: ({ control }) => {
                        return (
                            <Controller
                                name="legalEntity"
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
                                            type: DictionaryType.LEGAL_ENTITY,
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
