import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";
import { sidebarConfiguration } from "src/app/layout/sidebar";

export const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        flexShrink: { md: 0 },
        width: sidebarConfiguration.drawerWidth,
    },
    drawerPaper: {
        width: sidebarConfiguration.drawerWidth,
        height: `calc(100% - ${sidebarConfiguration.top}px)`,
        background: theme?.colors?.primary[500],
        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.2)",
        color: theme.palette.primary.contrastText,
        borderRight: "none",
        top: sidebarConfiguration.top,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
        "&:hover": {
            boxShadow: "0px -1px 23px 0px rgba(0, 0, 0, 0.12)",
        },
    },
    opened: {
        width: sidebarConfiguration.drawerWidth,
    },
    closed: {
        width: `calc(${theme.spacing(6)} + 1px)`,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    button: {
        borderRadius: "12px",
        overflow: "hidden",
    },
    menuButton: {
        borderRadius: "12px",
        overflow: "hidden",
    },
    toolbarOpen: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 40,
        padding: "6px 16px",
    },
    toolbarClose: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        paddingLeft: 5,
    },
    icon: {
        width: theme.iconSize,
        height: theme.iconSize,
    },
    versionContainer: {
        textAlign: "left",
        fontSize: "0.9rem",
        color: theme.palette.text.secondary,
        padding: theme.spacing(1),
    },
}));
