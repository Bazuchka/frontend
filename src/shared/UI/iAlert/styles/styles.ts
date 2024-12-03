import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    wrapper: {
        background: "white",
        color: "black",
        marginBottom: "4px",
    },
    messageList: {
        minWidth: "50vh",
        maxHeight: "75vh",
    },
    title: {
        marginBottom: "16px",
        paddingTop: "9px",
    },
    description: {
        lineHeight: "18px",
    },
    detailed: {
        cursor: "pointer",
        color: "blue",
    },
});

export default useStyles;
