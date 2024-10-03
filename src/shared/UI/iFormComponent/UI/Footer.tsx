import { Box, Stack, useTheme } from "@mui/material";
import cn from "classnames";
import { observer } from "mobx-react";
import useStyles from "./styles";

export type ButtonProps = {
    onClick?: () => void;
    isAvailable?: boolean;
};

interface FooterProps {
    isButtonsHide?: boolean;
    buttons?: (classes: Record<string, string>) => JSX.Element | boolean;
    className?: string;
}

export const Footer = observer(({ isButtonsHide, buttons, className }: FooterProps) => {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <Box className={cn(classes.footer, className)} data-test-id="form-footer">
            {!isButtonsHide && buttons && (
                <Stack className={classes.buttonGroup} spacing={2} direction="row">
                    {buttons(classes)}
                </Stack>
            )}
        </Box>
    );
});
