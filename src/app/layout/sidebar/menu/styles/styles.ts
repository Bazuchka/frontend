import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";

export const useMenuStyles = createUseStyles((theme: Theme) => ({
    list: {
        padding: 0,
        marginBottom: "auto",
    },
    listItem: {
        display: "list-item",
        textAlign: "-webkit-match-parent",
        width: "auto",
        cursor: "default",
        margin: 0,
        padding: 0,
        "& .MuiListItemButton-root": {
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
        },
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 8,
        paddingBottom: 8,
    },
}));
