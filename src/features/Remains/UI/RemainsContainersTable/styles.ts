import { createUseStyles } from "react-jss";

const colorList = {
    white: "#fff",
    blue: "#32386D",
};

export const useStyles = createUseStyles(() => ({
    container: {
        position: "relative",
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: "16px",
        top: "-36px",
        background: "none",
        minWidth: "auto",
        padding: "3px",
        cursor: "pointer",
        border: "1px solid " + colorList.blue,
        color: colorList.blue,
        transitionProperty: "all",

        "&:hover": {
            "& path": {
                stroke: colorList.white,
            },
        },

        "& .MuiTypography-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    buttonIcon: {
        display: "flex",
    },
}));
