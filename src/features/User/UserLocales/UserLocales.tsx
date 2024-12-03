import { JSX, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Box, Popper, Grow, Paper, useTheme, MenuItem, MenuList } from "@mui/material";
import { createUseStyles } from "react-jss";
import { userBarConfiguration } from "src/features/User/UserBar/configs";

const useStyles = createUseStyles(() => ({
    userLocales: {
        display: "flex",
        width: "160px",
        "&:active": {
            background: "none",
        },
        "& .MuiButton-root": {
            padding: 0,
            lineHeight: "16px",
            textTransform: "none",
            fontSize: "16px",
            letterSpacing: "0.15px",
            "&:hover": {
                background: "none",
            },
        },
    },
    popperContainer: {
        marginTop: "-7px !important",
        marginRight: "17px !important",
        zIndex: 1,
    },
    paperContainer: {
        "& .MuiPaper-root": {
            width: "200px",
        },
    },
    menuItemContainer: {
        paddingRight: "0px !important",
    },
}));

const UserLocales = (): JSX.Element => {
    const { t, i18n } = useTranslation(["Action", "Languages"]);
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const theme = useTheme();
    const classes = useStyles({ theme });

    const handleToggle = () => setOpen((prevState) => !prevState);

    const handleChangeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        window.location.reload();
    };

    return (
        <MenuItem onClick={handleToggle} className={classes.menuItemContainer}>
            <Box className={classes.userLocales}>
                <Button ref={anchorRef} color="inherit" disableRipple>
                    <Box component={"div"}>
                        <Box>{t("Action:toggleLocale")}</Box>
                    </Box>
                </Button>
            </Box>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="left-start"
                transition
                disablePortal
                className={classes.popperContainer}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            width: userBarConfiguration.mainWidth,
                            transformOrigin:
                                placement === "bottom-start" ? "left top" : "left bottom",
                        }}>
                        <Paper className={classes.paperContainer}>
                            <MenuList
                                autoFocusItem={open}
                                id="userLocales"
                                aria-labelledby="composition-button">
                                <MenuItem onClick={() => handleChangeLanguage("ru")}>
                                    {t("Languages:russian")}
                                </MenuItem>
                                <MenuItem onClick={() => handleChangeLanguage("locale")}>
                                    {t("Languages:locale")}
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </MenuItem>
    );
};

export default UserLocales;
