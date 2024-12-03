import { AlertColor } from "@mui/material";
import { useTranslation } from "react-i18next";

const getErrorCode = (error: string): string => {
    const [prefix, ...rest] = error.split(".");
    const body = rest.join(".");
    return `${prefix}:${body}`;
};

const updateLongString = (message: string, isFullMode: boolean): string => {
    return message.length > 200 && !isFullMode ? `${message.slice(0, 199)}...` : message;
};

const getAlertTitle = (mode: AlertColor | null): string => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation();

    switch (mode) {
        case "success":
            return t("Shared:AlertMessages.title.success");
        case "error":
            return t("Shared:AlertMessages.title.error");
        default:
            return "";
    }
};

export { getErrorCode, updateLongString, getAlertTitle };
