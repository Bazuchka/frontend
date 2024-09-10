import { Theme } from "@mui/material";

import { createUseStyles } from "react-jss";

export const useIFieldStyles = createUseStyles((theme: Theme) => ({
    field: {
        marginBottom: 32,
        alignItems: "flex-start",
    },
    label: {
        display: "block",
        textAlign: "left",
        marginLeft: "10px",
        fontWeight: 600,
        wordWrap: "break-word",
        color: theme?.colors?.primary[800],
    },
    textValue: {
        display: "block",
        textAlign: "left",
        lineHeight: "24px",
        color: theme?.colors?.secondary[900],
        wordBreak: "break-word",
    },
    disabled: {
        color: theme?.palette?.grey[500],
    },
    iconValue: {
        display: "block",
        marginRight: "8px",
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
    },
    flexContainerEditable: {
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
    },
    value: {
        textAlign: "left",
    },
    ratingAlign: {
        display: "flex",
        alignItems: "center",
    },
    link: {
        color: theme.linkColor,
    },
    button: {
        marginLeft: 10,
        height: 40,
    },
}));
