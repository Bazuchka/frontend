import { FC } from "react";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { DictionaryParams, DictionaryType } from "src/shared/hooks/useDictionary/types";
import { formStyle } from "src/shared/UI/AutocompleteSelectOfDictionary/styles/styles";
import { AutocompleteSelectOfDictionary } from "./AutocompleteSelectOfDictionary";

interface AutocompleteSelectOfDictionaryFormProps {
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    value?: ChosenSelectObject;
    externalValue?: Record<string, string | null> | null | undefined;
    fieldName: string;
    onChange?: (arg: ChosenSelectObject | null) => void;
    isDisable?: boolean;
    translatePath?: string;
    error?: boolean;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    onClear?: () => void;
    testFieldName?: string;
    mapDataCallback?: <T>(list: T[]) => T[];
}

const AutocompleteSelectOfDictionaryForm: FC<AutocompleteSelectOfDictionaryFormProps> = (props) => {
    const handleValueChange = (value: ChosenSelectObject | null) => {
        props.onChange && props?.onChange(value);
    };

    return (
        <AutocompleteSelectOfDictionary
            onValueChange={handleValueChange}
            style={formStyle}
            {...props}
        />
    );
};

export default AutocompleteSelectOfDictionaryForm;
