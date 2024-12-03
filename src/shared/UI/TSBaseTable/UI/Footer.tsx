import { Box, Stack, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { Pagination, PaginationProps } from "./Pagination";
import useStyles from "./styles";

export type ButtonProps = {
    onClick?: () => void;
    isAvailable?: boolean;
};

interface FooterProps {
    paginator: PaginationProps;
    isButtonsHide?: boolean;
    buttons?: (classes: Record<string, string>) => JSX.Element | boolean;
}

export const Footer = observer(({ paginator, isButtonsHide, buttons }: FooterProps) => {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <Box className={classes.footer} data-test-id="table-footer">
            {!isButtonsHide && buttons && (
                <Stack className={classes.buttonGroup} spacing={2} direction="row">
                    {buttons(classes)}
                </Stack>
            )}
            <Pagination {...paginator} />
        </Box>
    );
});
