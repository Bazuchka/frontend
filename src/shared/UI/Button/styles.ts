import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme: Theme) => ({
    button: {
        backgroundColor: theme?.colors?.primary[500],
        color: theme?.headerTextColor,
        fontStyle: theme?.typography?.subtitle2,
        letterSpacing: 1.25,
        height: 36,
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
