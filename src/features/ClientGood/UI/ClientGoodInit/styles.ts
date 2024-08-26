import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";

export const useStyles = createUseStyles((theme: Theme) => ({
    paper: {
        background: "#F5F5F5",
        padding: "40px",
    },
    rootBox: {
        backgroundColor: "#F5F5F5",
        padding: "0",
    },
    title: {
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: 600,
        paddingTop: 0,
        color: theme.colors.primary[800],
        marginBottom: "8px",
    },
    form: {
        background: "white",
        padding: "28px 16px 0px 16px",
        borderRadius: "4px 0px 0px 0px",
        height: "calc(100% - 4px)",
        "& > :first-child": {
            height: "calc(100% - 64px)",
            padding: "5px",
        },
        marginTop: "5px",
    },
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
        margin: "35px 5px 25px 15px",
    },
}));
