import { FC } from "react";

import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { IdCode } from "src/shared/types";
import { AutocompleteMultiSelectOfDictionary } from "src/shared/UI/AutocompleteMultiSelectOfDictionary/AutocompleteMultiSelectOfDictionary";

interface AutocompleteMultiSelectOfDictionaryFormProps {
    fieldName: string;
    dictionaryParams: DictionaryParams;
    translatePath?: string;
    value?: IdCode[];
    defaultValue?: IdCode[];
    error?: boolean;
    isDisable: boolean;
    onChange?: (arg: IdCode[]) => void;
}

export const AutocompleteMultiSelectOfDictionaryForm: FC<
    AutocompleteMultiSelectOfDictionaryFormProps
> = (props) => {
    const {
        fieldName,
        dictionaryParams,
        translatePath,
        value = [],
        defaultValue = [],
        error = false,
        isDisable,
        onChange,
    } = props;

    const handleChange = (value: object[]) => {
        if (onChange) {
            onChange(value as IdCode[]);
        }
    };

    return (
        <AutocompleteMultiSelectOfDictionary
            fieldName={fieldName}
            dictionaryParams={dictionaryParams}
            translatePath={translatePath}
            value={value}
            defaultValue={defaultValue}
            error={error}
            isDisable={isDisable}
            onSelectValue={handleChange}
        />
    );
};
