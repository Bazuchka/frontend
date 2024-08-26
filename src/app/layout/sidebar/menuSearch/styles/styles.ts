import { createUseStyles } from "react-jss";

export const useMenuSearchStyles = createUseStyles(() => ({
    container: {
        background: "white",
        zIndex: "9999",
    },
    wrapper: {
        paddingLeft: "16px",
        paddingRight: "20px",
        position: "relative",
        width: "100%",
        zIndex: "999",
        marginBottom: "25px",
    },
    wrapperHidden: {
        height: "36px",
        marginBottom: "25px",
    },
    input: {
        background: "white",
        width: "100%",
        "&  fieldset": {
            borderColor: "transparent !important",
            outline: "none !important",
        },
        "& input": {
            padding: "0",
            minHeight: "36px",
        },
        borderRadius: "4px",
    },
    itemLabel: {
        display: "block",
    },
    paper: {
        width: "100%",
        minWidth: "280px",
    },
    inputWrapper: {
        position: "relative",
        width: "100%",
    },
    inputCloseButton: {
        position: "absolute",
        top: "50%",
        right: "5px",
        transform: "translate(0, -50%)",
        zIndex: "10",
        color: "black",
        border: "none",
        background: "white",
        display: "block",
        cursor: "pointer",
        "& svg": {
            width: "20px",
            height: "20px",
        },
    },
    breadcrumbs: {
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        "& svg": {
            width: "20px",
            height: "20px",
        },
    },
}));
