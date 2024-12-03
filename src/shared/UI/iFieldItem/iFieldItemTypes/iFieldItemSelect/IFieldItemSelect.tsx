import { Grid, useTheme } from "@mui/material";
import React from "react";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";
import { RenderSelectValueType } from "src/shared/UI/iFieldItem/iFieldItemTypes/iFieldItemSelect/types";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";

interface IFieldItemInputProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    value: string;
    fieldName: string;
    renderSelectValue: RenderSelectValueType;
    testFieldName?: string;
}

const IFieldItemSelect: React.FC<IFieldItemInputProps> = ({
    fullLine,
    labelWidth,
    valueWidth,
    label,
    value,
    fieldName,
    renderSelectValue,
    testFieldName,
}) => {
    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    return (
        <Grid
            className={classes.field}
            container
            columns={12}
            xs={fullLine ? 12 : 6}
            data-test-id={`field:${testFieldName ?? fieldName}`}>
            <Grid item xs={labelWidth}>
                <FieldLabel label={label} fieldName={fieldName} className={classes.label} />
            </Grid>
            <Grid item xs={valueWidth}>
                {renderSelectValue(value)}
            </Grid>
        </Grid>
    );
};

export default IFieldItemSelect;
