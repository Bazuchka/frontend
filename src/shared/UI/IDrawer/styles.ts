import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => ({
    paper: {
        background: "#F5F5F5",
        width: "986px",
        height: "100%",
        padding: "40px",
    },
    closeIcon: {
        position: "absolute",
        right: 22,
        top: 30,
    },
}));
