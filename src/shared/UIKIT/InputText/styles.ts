import { createUseStyles } from "react-jss";
import { Theme } from "@mui/material";
import { CommonSize } from "src/shared/UIKIT";

interface StyleProps {
    isFocused: boolean;
    error: boolean;
    disabled?: boolean;
    iconStart?: boolean;
    iconEnd?: boolean;
    size?: CommonSize;
    theme: Theme;
}

export const useInputTextStyles = createUseStyles({
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
    },
    inputLabel: ({ isFocused, theme }: StyleProps) => ({
        color: isFocused ? theme.colors.primary.accent : theme.colors.charcoal,
        fontFamily: theme.typography.fontFamily,
        fontSize: "14px",
        fontWeight: 500,
    }),
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    inputField: ({
        error,
        disabled,
        iconStart,
        iconEnd,
        size = CommonSize.Regular,
        theme,
    }: StyleProps) => ({
        background: theme.surfaceColor,
        borderRadius: "5px",
        border: `1px solid ${error ? theme.colors.error : theme.colors.gray.superLightGray}`,
        padding: "8px",
        fontFamily: theme.typography.fontFamily,
        fontSize:
            size === CommonSize.Regular ? "14px" : size === CommonSize.Medium ? "16px" : "18px",
        color: theme.colors.black,
        width: "100%",
        height: size === CommonSize.Regular ? "40px" : size === CommonSize.Medium ? "48px" : "56px",
        boxSizing: "border-box",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        paddingLeft: iconStart ? "40px" : "8px",
        paddingRight: iconEnd ? "40px" : "8px",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        "&:focus": {
            borderColor: theme.colors.primary.main,
            boxShadow: `0px 0px 0px 2px ${theme.colors.primary.variant}30`,
            outline: "none",
        },
        "&:disabled": {
            background: disabled ? theme.colors.gray.disabled : "inherit",
            cursor: disabled ? "not-allowed" : "inherit",
        },
    }),
    hintText: ({ error, theme }: StyleProps) => ({
        color: error ? theme.colors.error : theme.colors.charcoal,
        fontFamily: theme.typography.fontFamily,
        fontSize: "14px",
        marginTop: "4px",
    }),
    iconStart: {
        position: "absolute",
        left: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconEnd: {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});
