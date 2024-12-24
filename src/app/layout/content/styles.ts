import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";
import { sidebarConfiguration } from "src/app/layout/sidebar";

export const useContentStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.mainBackgroundColor,
        marginTop: `${sidebarConfiguration.top}px`,
        height: `calc(100vh - ${sidebarConfiguration.top}px)`,
        overflow: "hidden",
        transition: theme.transitions.create(["width", "margin-left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    fullContentWidth: {
        marginLeft: sidebarConfiguration.drawerWidth,
    },
    collapsedContentWidth: {
        marginLeft: sidebarConfiguration.drawerCollapsedWidth,
    },
    pageTitleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "13px 16px 8px 16px",
        minHeight: "59px",
    },
    pageTitle: {
        fontSize: "34px",
        fontStyle: "normal",
        fontWeight: 600,
        color: theme.colors.primary[800],
        margin: "0",
    },
    pageContent: {
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        paddingBottom: "2px",
        overflow: "hidden",
    },
}));
