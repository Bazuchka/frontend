import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";

export const useIMenuItemStyles = createUseStyles((theme: Theme) => ({
    link: {
        textDecoration: "none",
        color: "inherit",
        minWidth: 0,
        overflow: "hidden",
    },
    icon: {
        color: theme.palette.primary.contrastText,
        minWidth: 34,
    },
    list: {
        padding: 0,
        minWidth: 0,
        overflow: "hidden",
    },
    main: {
        padding: "4px 0 4px 16px",
        minWidth: 0,
        overflow: "hidden",
        "& .MuiTypography-root": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },
    },
    subItem: {
        paddingLeft: 16,
        overflow: "hidden",
        width: "100%",
        "& .MuiTypography-root": {
            width: "90%",
        },
    },
    underline: {
        textDecoration: "underline",
    },
    arrow: {
        padding: "0 16px",
    },
}));
