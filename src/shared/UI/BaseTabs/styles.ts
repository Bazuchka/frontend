import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme?: Theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    tabs: {
        minHeight: 40,
        height: "100%",
    },
    borderBottom: {
        borderBottom: "1px solid divider",
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        ...theme?.contentWrapper,
    },
}));
