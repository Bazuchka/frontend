import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";

export const useIFormStyles = createUseStyles((theme: Theme) => ({
    formControl: {
        flexGrow: 1,
        padding: "32px 16px 16px 16px",
        border: `solid 1px ${theme.palette.primary.main}`,
        borderRadius: "8px",
        width: "100%",
    },
    formLabel: {
        fontSize: 12,
        padding: "0 6px",
        margin: "0 16px",
    },
    formGroup: {
        width: "100%",
    },
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
    },
    fullHeight: {
        flexGrow: 1,
        padding: 0,
        border: `solid 1px ${theme.palette.primary.main}`,
        borderRadius: "8px",
        width: "100%",
        height: "100%",
    },
}));
