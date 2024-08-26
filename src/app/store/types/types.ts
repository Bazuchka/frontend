import { AlertColor } from "@mui/material";
import { ResponseErrorType } from "src/shared/UI/iAlert/types/types";

export interface Alert {
    alertMode: AlertColor | null;
    isDelete?: boolean;
    message?: string;
    context?: ResponseErrorType;
    closeTime?: number;
    id: string;
}

export interface AddAlertMessageProps {
    alertMode?: AlertColor | null;
    isDelete?: boolean;
    message?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: Record<string, any>;
    throttleByMessage?: boolean;
    closeTime?: number;
}
