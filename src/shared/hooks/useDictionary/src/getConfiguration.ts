import { dictionaryTypeToUrl } from "src/shared/hooks/useDictionary/src/dictionaryTypes";
import { DictionaryType } from "../types";

export const getConfiguration = (params: { type?: DictionaryType | null }): { url: string } => {
    const { type } = params || {};

    const url = (type && dictionaryTypeToUrl()[type]) || "/404";

    return { url };
};
