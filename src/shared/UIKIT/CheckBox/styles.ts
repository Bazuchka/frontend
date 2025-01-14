import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";
import { CommonSize } from "..";

export const checkBoxStyles = ({
    theme,
    size,
    labelPosition,
}: {
    theme: Theme;
    size: CommonSize;
    labelPosition: "top" | "left";
}) => {
    const sizeStrList = {
        [CommonSize.Small]: "16",
        [CommonSize.Medium]: "20",
        [CommonSize.Large]: "24",
        [CommonSize.Regular]: "24",
    };

    const iconSizeList = {
        [CommonSize.Small]: "10",
        [CommonSize.Medium]: "14",
        [CommonSize.Large]: "17",
        [CommonSize.Regular]: "17",
    };

    const isLeftLabel = labelPosition === "left";

    return createUseStyles(() => ({
        checkbox: {
            position: "absolute",
            zIndex: "-1",
            opacity: "0",

            "&+label": {
                display: "inline-flex",
                flexDirection: isLeftLabel ? "row" : "column",
                alignItems: isLeftLabel ? "center" : "start",
                userSelect: "none",
                cursor: "pointer",
            },

            "&+label:after": {
                content: "''",
                display: "inline-block",
                marginLeft: isLeftLabel ? "auto" : "0",
                width: sizeStrList[size] + "px",
                height: sizeStrList[size] + "px",
                flexShrink: "0",
                flexGrow: "0",
                border: "1px solid " + theme.colors.gray.lightGrey,
                borderRadius: "2px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: iconSizeList[size] + "px",
            },

            "&+label:hover:after": {
                borderColor: theme.colors.secondary.main,
            },

            "&:focus+label:after": {
                boxShadow: "1px solid " + theme.colors.secondary.light,
            },

            "&:checked+label:after": {
                borderColor: theme.colors.primary.main,
                backgroundColor: theme.colors.primary.main,
                backgroundImage: "url('/src/assets/icons/doneToggle.svg')",
            },
        },
    }));
};
