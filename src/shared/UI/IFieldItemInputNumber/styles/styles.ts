import { createUseStyles } from "react-jss";

const useInputNumberStyles = createUseStyles(() => ({
    wrapper: {
        width: "100%",

        "&.MuiInputBase-root": {
            "&:after, &:before ": {
                display: "none",
            },

            "& input": {
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                padding: "8.5px 14px",
                margin: "3px 0",
                appearance: "none",

                "&:hover": {
                    border: "1px solid black",
                },
            },

            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
            },

            "& input[type='number']": {
                "-moz-appearance": "textfield",
            },
        },
    },
}));

export default useInputNumberStyles;
