import { t } from "i18next";

import { ChosenSelectObject } from "../SelectOfDictionaryForm/SelectOfDictionaryForm";

interface GetOptionLabelProps {
    option: ChosenSelectObject;
    translatePath: string | undefined;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
}

export const getOptionLabel = (props: GetOptionLabelProps): string => {
    const { option, translatePath, renderValuePrimary, renderValueSecondary } = props;
    const code = option.code || option[renderValuePrimary as keyof ChosenSelectObject] || "";
    const name = option.name || option[renderValueSecondary as keyof ChosenSelectObject] || "";

    return (translatePath ? t(`${translatePath}.${code}`) : code) + (name ? `_${name}` : "");
};
