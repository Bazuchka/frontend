import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme: Theme) => ({
    button: {
        width: "15%",
        minWidth: "50px",
        minHeight: "50px",
        color: theme?.headerTextColor,
        fontStyle: theme?.typography?.subtitle2,
        padding: "12px 10px",
        borderWidth: "3px",
        borderStyle: "solid",
        borderColor: theme?.colors?.secondary[500],
        borderRadius: 0,
        "&:hover": {
            backgroundColor: theme?.colors?.secondary[500],
            color: theme?.headerTextColor,
        },
        "&:disabled": {
            background: theme?.colors?.secondary[500],
            color: theme?.headerTextColor,
            borderRadius: 0,
        },
    },
    label: {
        display: "block",
        textAlign: "left",
        marginLeft: "5px",
        marginTop: "14px",
        fontWeight: 600,
        color: theme?.colors?.primary[800],
    },
    group: {
        maxHeight: "50%",
        overflow: "auto",
    },
}));

export default useStyles;
