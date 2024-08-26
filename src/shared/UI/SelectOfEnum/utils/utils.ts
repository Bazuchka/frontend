import { t } from "i18next";
import { ValueOption } from "src/shared/hooks/useDictionary/config";

export const getTranslatedValue = (value = "", translatePath?: string) => {
    if (!value) {
        return "";
    }
    const lastChar = translatePath?.slice(-1);
    const pathSeparator = lastChar === ":" ? "" : ".";
    const translatedValue = translatePath ? t(translatePath + pathSeparator + value) : value;
    return translatedValue;
};

const EMPTY_VALUE = "";

export const addEmptyValue = (data: string[] | ValueOption[]) => {
    if (!data.length) {
        return data;
    }
    if (typeof data[0] === "string") {
        return [EMPTY_VALUE, ...data];
    }
    return [{ value: EMPTY_VALUE }, ...data];
};
