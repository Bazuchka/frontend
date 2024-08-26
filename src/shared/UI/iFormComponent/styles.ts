import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";

export const useIFormStyles = createUseStyles((theme: Theme) => ({
    form: {
        border: "none",
        "& >.MuiGrid-root": {
            margin: "0px",
        },
    },
    loadContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "248px",
    },
    buttonGroup: {
        paddingTop: 16,
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `solid 1px ${theme.palette.primary.main}`,
        "&:hover": {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
        },
    },
    horizontalDirection: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "49.4%",
        justifyContent: "space-between",
        "&:first-child": {
            marginRight: "1%",
        },
    },
    verticalDirection: {
        width: "100%",
    },
}));
