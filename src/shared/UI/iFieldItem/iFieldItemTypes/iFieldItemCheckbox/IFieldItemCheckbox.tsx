import React from "react";
import { Grid, useTheme } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IInlineHelp } from "src/shared/UI/IInlineHelp";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";

interface IFieldItemCheckboxProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    value: boolean;
    fieldName: string;
    withDescription?: boolean | undefined;
    description?: string | undefined;
    testFieldName?: string;
}

const IFieldItemCheckbox: React.FC<IFieldItemCheckboxProps> = ({
    fullLine,
    labelWidth,
    valueWidth,
    label,
    value,
    fieldName,
    withDescription,
    description,
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
                {value ? (
                    <CheckIcon color="success" className={classes.iconValue} />
                ) : (
                    <CloseIcon color="error" className={classes.iconValue} />
                )}
                {withDescription && !!description?.length && (
                    <IInlineHelp describe={description as string} />
                )}
            </Grid>
        </Grid>
    );
};

export default IFieldItemCheckbox;
