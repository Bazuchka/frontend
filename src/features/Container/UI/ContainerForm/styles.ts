import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(() => ({
    rootBox: {
        height: "100%",
    },
    form: {
        background: "white",
        padding: "28px 16px 20px 16px",
        borderRadius: "4px 0px 0px 0px",
        height: "calc(100% - 4px)",
        "& > :first-child": {
            height: "calc(100% - 64px)",
            padding: "5px",
        },
    },
    buttons: {
        marginTop: 30,
        padding: "5px",
    },
}));
