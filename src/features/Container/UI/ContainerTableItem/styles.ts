import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => ({
    container: {
        position: "relative",
        height: "100%",
    },
    button: {
        position: "absolute",
        right: "16px",
        top: "-36px",
    },
}));
