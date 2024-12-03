import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme: Theme) => ({
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "49px",
        minHeight: "49px",
        backgroundColor: "white",
        marginTop: "auto",
    },
    buttonsWrapper: {
        display: "flex",
        columnGap: "10px",
    },
    buttonGroup: {},
    button: {
        backgroundColor: theme?.colors?.primary[500],
        color: theme?.headerTextColor,
        fontStyle: theme?.typography?.subtitle2,
        letterSpacing: 1.25,
        lineHeight: "16px",
        padding: "10px 14px",
        "&:hover": {
            backgroundColor: theme?.colors?.primary[500],
            color: theme?.headerTextColor,
        },
        "&:disabled": {
            background: theme?.colors?.secondary[500],
            color: theme?.headerTextColor,
        },
    },
}));

export default useStyles;
