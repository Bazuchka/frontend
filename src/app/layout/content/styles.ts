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
    pageTitle: {
        fontSize: "34px",
        fontStyle: "normal",
        fontWeight: 600,
        padding: ".83em 0 8px 16px",
        color: theme.colors.primary[800],
        margin: "0",
    },
    pageContent: {
        flexGrow: "1",
        paddingBottom: "2px",
        overflow: "hidden",
    },
}));
