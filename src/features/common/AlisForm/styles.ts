import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme: Theme) => ({
    buttons: {
        marginTop: 6.5,
        background: "white",
        border: "none",
        "&:hover": {
            cursor: "pointer",
        },
        color: theme.palette.primary.main,
    },
}));
