import { Grid, useTheme } from "@mui/material";
import { format } from "date-fns";
import { FC } from "react";
import FieldLabel from "src/shared/UI/iFieldItem/FieldLabel";
import FieldValue from "src/shared/UI/iFieldItem/FieldValue";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";

interface IFieldItemDateTimeProps {
    fullLine?: boolean | undefined;
    labelWidth: number;
    valueWidth: number;
    label: string;
    value: Date;
    fieldName: string;
    isDisable?: boolean | undefined;
    testFieldName?: string;
}

const IFieldItemTime: FC<IFieldItemDateTimeProps> = (props) => {
    const { fullLine, labelWidth, valueWidth, label, value, fieldName, isDisable, testFieldName } =
        props;

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
                <FieldValue
                    value={value && format(value, "HH:mm")}
                    className={`${classes.textValue} ${isDisable ? classes.disabled : ""}`}
                    fieldName={fieldName}
                />
            </Grid>
        </Grid>
    );
};

export default IFieldItemTime;
