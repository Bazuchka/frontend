import { FC } from "react";
import { Box, useTheme } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { FormProps } from "./types";
import { useIFormStyles } from "./styles";

const IFormGroup: FC<FormProps> = ({ label, children, className, fullHeight }) => {
    const theme = useTheme();
    const classes = useIFormStyles({ theme });

    return (
        <Box
            component="fieldset"
            className={fullHeight ? classes.fullHeight : classes.formControl + " " + className}>
            <FormLabel component="legend" className={classes.formLabel}>
                {label}
            </FormLabel>
            <FormGroup className={classes.formGroup + " " + classes.wrapper}>{children}</FormGroup>
        </Box>
    );
};

export default IFormGroup;
