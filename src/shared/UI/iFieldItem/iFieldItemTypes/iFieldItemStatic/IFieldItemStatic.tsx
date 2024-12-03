import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";

interface IFieldItemInputProps {
    fullLine?: boolean | undefined;
    component: React.ReactNode;
    fieldName: string;
    testFieldName?: string;
}

const IFieldItemStatic: React.FC<IFieldItemInputProps> = ({
    fullLine,
    component,
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
            {component}
        </Grid>
    );
};

export default IFieldItemStatic;
