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
        position: "absolute",
        right: "16px",
        top: "-36px",
        display: "flex",
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
    },
    buttonIcon: {
        display: "flex",
    },
}));
