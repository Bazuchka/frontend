import { t } from "i18next";

import { ChosenSelectObject } from "../SelectOfDictionaryForm/SelectOfDictionaryForm";

interface GetOptionLabelProps {
    option: ChosenSelectObject;
    translatePath: string | undefined;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    defaultNullValue?: string;
    useRenderValuePattern?: boolean;
}

export const getOptionLabel = (props: GetOptionLabelProps): string => {
    const {
        option,
        translatePath,
        renderValuePrimary,
        renderValueSecondary,
        defaultNullValue,
        useRenderValuePattern,
    } = props;

    let code, name;

    if (useRenderValuePattern) {
        code = option[renderValuePrimary as keyof ChosenSelectObject] || option.code || "";
        name = option[renderValueSecondary as keyof ChosenSelectObject] || option.name || "";
    } else {
        code = option.code || option[renderValuePrimary as keyof ChosenSelectObject] || "";
        name = option.name || option[renderValueSecondary as keyof ChosenSelectObject] || "";
    }

    if (!option.code && !option.name && defaultNullValue) {
        return defaultNullValue;
    }

    return (translatePath ? t(`${translatePath}.${code}`) : code) + (name ? `_${name}` : "");
};
