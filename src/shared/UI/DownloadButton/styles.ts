import { createUseStyles } from "react-jss";

const colorList = {
    blue: "#32386D",
};

export const useStyles = createUseStyles(() => ({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "38px",
        height: "38px",
        background: "none",
        minWidth: "auto",
        padding: "3px",
        cursor: "pointer",
        border: "1px solid " + colorList.blue,
        color: colorList.blue,
        transitionProperty: "all",
    },
}));
