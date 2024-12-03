import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";
import { headerConfiguration } from "src/app/layout/header/configs";

export const useStyles = createUseStyles((theme: Theme) => ({
    appBar: {
        position: "fixed",
        elevation: 0,
        backgroundColor: theme.headerBackgroundColor,
        boxShadow: "none",
    },
    toolbar: {
        maxHeight: 40,
        padding: "0px 16px",
        display: "flex",
        justifyContent: "space-between",
    },
    container: {
        display: "flex",
        alignItems: "center",
    },
    logoPanel: {
        width: headerConfiguration.logoPanelWidth,
        display: "flex",
        alignItems: "center",
    },
    leftPanel: {
        display: "flex",
        alignItems: "center",
        marginLeft: "16px",
    },
    rightPanel: {
        display: "flex",
        alignItems: "center",
    },
    logoWrap: {
        flexGrow: 1,
    },
    logo: {
        width: 150,
        marginTop: 10,
        flexGrow: 1,
    },
    icons: {
        borderRadius: "12px",
        overflow: "hidden",
        marginLeft: "16px",
        marginRight: "16px",
        marginTop: "5px",
    },
    icon: {
        width: theme.iconSize,
        height: theme.iconSize,
    },
    select: {
        background: "white",
        width: 200,
        borderRadius: "4px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
        },
        "& .MuiAutocomplete-popper": {
            top: "4px !important",
        },
        "& .MuiAutocomplete-root .MuiOutlinedInput-root": {
            padding: "4px 44px 4px 8px",
        },

        "& .MuiAutocomplete-root.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root": {
            paddingRight: "72px",
        },

        "& .MuiIconButton-sizeMedium": {
            marginRight: "5px",
        },
    },
}));
