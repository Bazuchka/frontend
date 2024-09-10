import { useTheme } from "@mui/material";
import { t } from "i18next";
import { ReactElement } from "react";
import FieldValue from "src/shared/UI/iFieldItem/FieldValue";
import { getTranslatedValue } from "../../SelectOfEnum";
import { useIFieldStyles } from "../styles";
import { RenderSelectValueProps } from "../types";

export const useRenderSelectValue = (props: RenderSelectValueProps): ReactElement => {
    const {
        value,
        fieldName,
        translatePath,
        isDisable,
        isReadOnly,
        renderValuePrimary,
        renderValueSecondary,
        nonEditableValue,
    } = props;

    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    if (!value) {
        return <FieldValue value={""} fieldName={fieldName} />;
    }

    const valueClassName = `${classes.textValue} ${
        isDisable && isReadOnly ? classes.disabled : ""
    }`;

    if (nonEditableValue) {
        return (
            <FieldValue value={nonEditableValue} className={valueClassName} fieldName={fieldName} />
        );
    }

    if (typeof value === "object") {
        return renderValueFromObject(
            value,
            renderValuePrimary,
            renderValueSecondary,
            translatePath,
            valueClassName,
            fieldName
        );
    } else {
        const fieldValue = getTranslatedValue(value, translatePath);
        return <FieldValue value={fieldValue} className={valueClassName} fieldName={fieldName} />;
    }
};

const renderValueFromObject = (
    value: {
        code?: string;
        name?: string;
        renderValuePrimary?: string;
        renderValueSecondary?: string;
    },
    renderValuePrimary: RenderSelectValueProps["renderValuePrimary"],
    renderValueSecondary: RenderSelectValueProps["renderValueSecondary"],
    translatePath: RenderSelectValueProps["translatePath"],
    valueClassName: string,
    fieldName: RenderSelectValueProps["fieldName"]
): ReactElement => {
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
            <FieldValue value={translatedValue} className={valueClassName} fieldName={fieldName} />
        );
    }

    if (
        !value.code ||
        (!value[renderValuePrimary as keyof typeof value] && value.name) ||
        value[renderValueSecondary as keyof typeof value]
    ) {
        return (
            <FieldValue value={value.name || ""} className={valueClassName} fieldName={fieldName} />
        );
    }

    return <FieldValue value={""} className={valueClassName} fieldName={fieldName} />;
};
