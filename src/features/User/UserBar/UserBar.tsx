import { FC, SyntheticEvent, useRef, useState, KeyboardEvent, Suspense } from "react";
import {
    Box,
    Button,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createUseStyles } from "react-jss";
import { ITooltype } from "src/shared/UI/iTooltype";
import { UserLocales } from "src/features/User/UserLocales";
import { DialogAction, IModal } from "src/shared/UI/iModal";
import { userBarConfiguration } from "./configs";
import { authService } from "src/shared/services/AuthService";

const useStyles = createUseStyles((theme: Theme) => ({
    userBar: {
        display: "flex",
        width: userBarConfiguration.mainWidth,
        "& .MuiButton-root": {
            padding: 0,
            lineHeight: "16px",
            marginLeft: "16px",
            "& .MuiBox-root": {
                width: userBarConfiguration.mainWidth,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                "& .MuiBox-root:first-child": {
                    marginBottom: "5px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },
            },
        },
    },
    icon: {
        width: theme.iconSize,
        height: theme.iconSize,
    },
    popperContainer: {
        paddingTop: "10px",
    },
}));

interface UserBarProps {}

const UserBar: FC<UserBarProps> = () => {
    const { t } = useTranslation(["Translation", "Dialog"]);
    // const dialog = useTranslation("dialog");
    const [open, setOpen] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const theme = useTheme();
    const classes = useStyles({ theme });

    const handleToggle = () => setOpen((prevState) => !prevState);

    const username = authService.getUserFullName();
    const [name, surname, login] = username.split(" ");
    const logoutHandler = () => setModalIsOpen(true);

    const handleClose = (event: Event | SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    const dialogActions: DialogAction[] = [
        {
            label: t("Action:logOut"),
            onClick: () => authService.doLogout(),
        },
        {
            label: t("Action:no"),
            onClick: () => setModalIsOpen(false),
        },
    ];

    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <ITooltype
                    id={"mouse-over-help"}
                    item={<HelpOutlineIcon className={classes.icon} />}
                    label={"Shared:Help.label"}
                />
            </Box>
            <Box className={classes.userBar}>
                <Button ref={anchorRef} color="inherit" onClick={handleToggle}>
                    <Box component={"div"}>
                        <Box>
                            {name} {surname}
                        </Box>
                        <Box>{login}</Box>
                    </Box>
                </Button>
            </Box>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
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
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="userMenu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={logoutHandler}>
                                        {t("Action:logOut")}
                                    </MenuItem>
                                    <Suspense
                                        fallback={
                                            <MenuItem
                                                style={{
                                                    fontSize: "16px",
                                                    lineHeight: "16px",
                                                    letterSpacing: "0.15px",
                                                }}>
                                                {t("Action:toggleLocale")}
                                            </MenuItem>
                                        }>
                                        <UserLocales />
                                    </Suspense>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <IModal
                title={t("exitConfirmation", { ns: "Dialog" }) || ""}
                open={modalIsOpen}
                dialogActions={dialogActions}
            />
        </>
    );
};

export default UserBar;
