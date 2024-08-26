import React from "react";
import { Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { IInlineHelp } from "src/shared/UI/IInlineHelp";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";

interface IFieldItemInputProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    value: string;
    fieldName: string;
    withDescription?: boolean | undefined;
    description?: string | undefined;
    linkTo: string;
    testFieldName?: string;
}

const IFieldItemLink: React.FC<IFieldItemInputProps> = ({
    fullLine,
    labelWidth,
    valueWidth,
    label,
    value,
    withDescription,
    description,
    fieldName,
    linkTo,
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
            <Grid xs={valueWidth} className={classes.flexContainer}>
                <Link className={classes.link} to={linkTo}>
                    {value}
                </Link>
            </Grid>
            {withDescription && !!description?.length && <IInlineHelp describe={"Some describe"} />}
        </Grid>
    );
};

export default IFieldItemLink;
