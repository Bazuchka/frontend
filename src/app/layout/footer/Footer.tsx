import { FC } from "react";
import { createUseStyles } from "react-jss";
import { Box, Typography, Theme, Toolbar, useTheme } from "@mui/material";
import * as packageJSON from "../../../../package.json";
import { sidebarConfiguration } from "src/app/layout/sidebar";

const useStyles = createUseStyles((theme: Theme) => ({
    footerContainer: {
        boxShadow: "0px -1px 23px rgba(0, 0, 0, 0.2)",
    },
    root: {
        flexGrow: 1,
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
    },
    button: {
        borderRadius: "12px",
        overflow: "hidden",
        marginRight: "8px",
    },
    iconActive: {
        height: theme.iconSize,
        width: theme.iconSize,
        color: "green",
    },
    iconInactive: {
        height: theme.iconSize,
        width: theme.iconSize,
        color: "red",
    },
    version: {
        color: theme?.palette.text.disabled,
        position: "absolute",
        transition: theme.transitions.create("left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));

interface FooterProps {
    isMenuOpen: boolean;
}

const Footer: FC<FooterProps> = ({ isMenuOpen }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const versionLeftPosition =
        (isMenuOpen
            ? sidebarConfiguration.drawerWidth
            : sidebarConfiguration.drawerCollapsedWidth) + 20;

    //TODO Mock
    return (
        <Box className={classes.footerContainer}>
            <Toolbar>
                <Box className={classes.root} />
                <Box className={classes.flexContainer}>
                    <Typography sx={{ left: versionLeftPosition }} className={classes.version}>
                        {packageJSON.version}
                    </Typography>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default Footer;
