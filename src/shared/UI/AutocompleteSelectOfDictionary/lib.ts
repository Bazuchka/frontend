import { t } from "i18next";

import { ChosenSelectObject } from "../SelectOfDictionaryForm/SelectOfDictionaryForm";

interface GetOptionLabelProps {
    option: ChosenSelectObject;
    translatePath: string | undefined;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    defaultNullValue?: string;
}

export const getOptionLabel = (props: GetOptionLabelProps): string => {
    const { option, translatePath, renderValuePrimary, renderValueSecondary, defaultNullValue } =
        props;
    const code = option.code || option[renderValuePrimary as keyof ChosenSelectObject] || "";
    const name = option.name || option[renderValueSecondary as keyof ChosenSelectObject] || "";

    if (!option.code && !option.name && defaultNullValue) {
        return defaultNullValue;
    }

    return (translatePath ? t(`${translatePath}.${code}`) : code) + (name ? `_${name}` : "");
};
