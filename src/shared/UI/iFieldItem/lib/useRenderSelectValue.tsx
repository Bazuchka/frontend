import { ReactElement } from "react";
import { t } from "i18next";
import { useTheme } from "@mui/material";
import FieldValue from "src/shared/UI/iFieldItem/FieldValue";
import { useIFieldStyles } from "../styles";
import { getTranslatedValue } from "../../SelectOfEnum";
import { renderSelectValueProps } from "../types";

export const useRenderSelectValue = (props: renderSelectValueProps): ReactElement => {
    const {
        value,
        fieldName,
        translatePath,
        isDisable,
        isReadOnly,
        renderValuePrimary,
        renderValueSecondary,
    } = props;

    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    if (!value) {
        return <FieldValue value={""} fieldName={fieldName} />;
    }

    const valueClassName = `${classes.textValue} ${
        isDisable && isReadOnly ? classes.disabled : ""
    }`;

    if (typeof value === "object") {
        const translatedValue =
            translatePath && (value.code || value[renderValuePrimary as keyof typeof value])
                ? t(
                      `${translatePath}.${
                          value?.code || value[renderValuePrimary as keyof typeof value]
                      }`
                  )
                : value?.code || value[renderValuePrimary as keyof typeof value];
        if (translatedValue) {
            return (
                <FieldValue
                    value={translatedValue}
                    className={valueClassName}
                    fieldName={fieldName}
                />
            );
        }

        if (
            !value.code ||
            (!value[renderValuePrimary as keyof typeof value] && value.name) ||
            value[renderValueSecondary as keyof typeof value]
        ) {
            return (
                <FieldValue
                    value={value.name || ""}
                    className={valueClassName}
                    fieldName={fieldName}
                />
            );
        }

        return <FieldValue value={""} className={valueClassName} fieldName={fieldName} />;
    } else {
        const fieldValue = getTranslatedValue(value, translatePath);

        return <FieldValue value={fieldValue} className={valueClassName} fieldName={fieldName} />;
    }
};
