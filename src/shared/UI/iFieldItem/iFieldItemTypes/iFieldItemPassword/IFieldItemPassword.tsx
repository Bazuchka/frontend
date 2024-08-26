import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";
import FieldValue from "src/shared/UI/iFieldItem/FieldValue";

interface IFieldItemInputProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    fieldName: string;
    testFieldName?: string;
}

const IFieldItemPassword: React.FC<IFieldItemInputProps> = ({
    fullLine,
    labelWidth,
    valueWidth,
    label,
    fieldName,
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
            <Grid xs={labelWidth}>
                <FieldLabel label={label} fieldName={fieldName} className={classes.label} />
            </Grid>
            <Grid xs={valueWidth}>
                <FieldValue value={"••••••••"} fieldName={fieldName} />
            </Grid>
        </Grid>
    );
};

export default IFieldItemPassword;
