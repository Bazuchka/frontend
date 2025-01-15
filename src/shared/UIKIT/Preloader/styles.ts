import { createUseStyles } from "react-jss";
import { preloaderSize } from "./Preloader";

export const usePreloaderStyles = (size: preloaderSize) => {
    const sizeStr = size === preloaderSize.bold ? "18px" : "16px";

    return createUseStyles({
        "@keyframes rotation": {
            "0%": {
                transform: "rotate(0deg)",
            },
            "100%": {
                transform: "rotate(360deg)",
            },
        },
        preloader: {
            animationName: "$rotation",
            animationTimingFunction: "linear",
            animationDuration: "3s",
            animationIterationCount: "infinite",
            width: sizeStr,
            height: sizeStr,
        },
    });
};
