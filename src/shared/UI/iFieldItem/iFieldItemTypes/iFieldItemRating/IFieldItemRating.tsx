import React from "react";
import { Grid, Rating, useTheme } from "@mui/material";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";

interface IFieldItemInputProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    value: number;
    fieldName: string;
    isDisable?: boolean | undefined;
    testFieldName?: string;
}

const IFieldItemRating: React.FC<IFieldItemInputProps> = ({
    fullLine,
    labelWidth,
    valueWidth,
    label,
    value,
    fieldName,
    isDisable,
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
                <label className={classes.label}>{label}</label>
            </Grid>
            <Grid
                xs={valueWidth}
                className={`${classes.ratingAlign} ${isDisable ? classes.disabled : ""}`}>
                <Rating value={value as number} precision={0.2} readOnly />
            </Grid>
        </Grid>
    );
};

export default IFieldItemRating;
