import { ValueOption } from "src/shared/hooks/useDictionary/config";
import { DictionaryParams, DictionaryType } from "src/shared/hooks/useDictionary/types";

export interface SelectOfEnumProps {
    isDisable?: boolean;
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    translatePath?: string;
    translate?: (value: string) => string;
    value?: string;
    fieldName?: string;
    error?: boolean;
    onChange: (value: string | undefined) => void;
    options?: string[] | ValueOption[];
    withEmptyValue?: boolean;
    withClearButton?: boolean;
    testFieldName?: string;
}

export interface GetSelectOfEnumProps {
    dictionaryType?: DictionaryType | null;
    translatePath?: string;
    options?: string[] | ValueOption[];
    dictionaryParams?: DictionaryParams;
}
