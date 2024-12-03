import { Theme } from "@mui/material";

import { createUseStyles } from "react-jss";

export const useFileUploadStyles = createUseStyles((theme: Theme) => ({
    dropZone: {
        border: `1px dashed ${theme.colors.primary[500]}`,
        minHeight: "60px",
        borderRadius: "10px",
        maxWidth: "1000px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        wordWrap: "anywhere",
        cursor: "pointer",
    },
    dropZoneActive: {
        backgroundColor: theme.colors.primary[100],
    },
    dropZoneError: {
        borderColor: theme.palette.error.main,
    },
    icon: {
        marginRight: "16px",
    },
    button: {
        border: "none",
        background: "none",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        textDecoration: "underline",
        color: theme.linkColor,
        cursor: "pointer",
    },
    input: {
        display: "none",
    },
}));
