import { Grid, useTheme } from "@mui/material";
import React from "react";
import { Button } from "src/shared/UI/Button";
import { useIFieldStyles } from "src/shared/UI/iFieldItem/styles";

interface IFieldItemCheckboxProps {
    fullLine?: boolean | undefined;
    valueWidth: number;
    label: string;
    onButtonClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
}

const IFieldItemButton: React.FC<IFieldItemCheckboxProps> = ({
    fullLine,
    onButtonClick,
    valueWidth,
    label,
    disabled,
}) => {
    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    return (
        <Grid container columns={12} xs={fullLine ? 12 : 6} data-test-id={`field:button:${label}`}>
            <Grid xs={valueWidth}>
                <Button disabled={disabled} className={classes.button} onClick={onButtonClick}>
                    {label}
                </Button>
            </Grid>
        </Grid>
    );
};

export default IFieldItemButton;
