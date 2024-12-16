import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";
import { sidebarConfiguration } from "src/app/layout/sidebar";

export const useContentStyles = createUseStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.mainBackgroundColor,
        marginTop: `${sidebarConfiguration.top}px`,
        flexGrow: 1,
        height: `calc(100vh - ${sidebarConfiguration.top}px)`,
        overflow: "auto",
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
        paddingTop: 0,
        color: theme.colors.primary[800],
        marginBottom: "8px",
        paddingLeft: "16px",
    },
}));
