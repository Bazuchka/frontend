import { Grid, useTheme } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React, { cloneElement, ReactElement } from "react";
import { Controller } from "react-hook-form";
import { createComponentByType } from "./lib/createComponentByType";

import { FieldItemType } from "./const";
import { IFieldItemStatic } from "./iFieldItemTypes/iFieldItemStatic";
import { getColumnWidths } from "./lib/getColumnWidths";
import { useIFieldStyles } from "./styles";
import { FieldItemProps } from "./types";

const IFormFieldEditable: React.FC<FieldItemProps> = ({
    label,
    value,
    externalValue,
    isReadOnly,
    type,
    fieldName,
    control,
    id,
    dictionaryType,
    fullLine,
    translatePath,
    isDisable,
    requestParams,
    component,
    isLabelNarrow,
    withDescription,
    required,
    error,
    renderValuePrimary,
    renderValueSecondary,
    withClearButton,
    register,
    validateMask,
    trigger,
    onClear,
    options,
    min,
    max,
    validate,
    testFieldName,
    events,
}) => {
    const { labelWidth, valueWidth } = getColumnWidths(isLabelNarrow, withDescription);

    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    if (type === FieldItemType.STATIC) {
        return (
            <IFieldItemStatic
                testFieldName={testFieldName}
                fullLine={fullLine}
                component={component}
                fieldName={fieldName}
            />
        );
    }

    return (
        <Grid
            container
            xs={fullLine ? 12 : 6}
            columns={12}
            className={classes.flexContainerEditable}
            data-test-id={`field:${testFieldName ?? fieldName}`}>
            <Grid xs={labelWidth}>
                <FormLabel
                    className={classes.label}
                    required={required}
                    data-test-id={`label:${testFieldName ?? fieldName}`}>
                    {label}
                </FormLabel>
            </Grid>
            <Grid xs={valueWidth}>
                <Controller
                    name={fieldName}
                    control={control}
                    shouldUnregister={true}
                    defaultValue={id && !isReadOnly ? id : value}
                    rules={{
                        required: required,
                        validate: (params) => (validate ? validate(params) : true),
                    }}
                    render={({ field }) =>
                        cloneElement(
                            createComponentByType(
                                fieldName,
                                testFieldName || fieldName,
                                type,
                                value,
                                dictionaryType,
                                requestParams,
                                isDisable,
                                translatePath,
                                required,
                                error,
                                renderValuePrimary,
                                renderValueSecondary,
                                withClearButton,
                                register,
                                validateMask,
                                externalValue,
                                onClear,
                                trigger,
                                min,
                                max,
                                options,
                                events?.mapDataCallback
                            ) as ReactElement,
                            {
                                ...field,
                                checked: !!field.value,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    field.onChange(e);
                                },
                            }
                        )
                    }
                />
            </Grid>
        </Grid>
    );
};

export default IFormFieldEditable;
