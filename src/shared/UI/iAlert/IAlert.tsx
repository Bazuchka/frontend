import { Alert, AlertColor, AlertTitle, Slide, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { FC, JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { viewStore } from "src/app/store";
import {
    getAlertTitle,
    getErrorCode,
    updateLongString,
} from "src/shared/UI/iAlert/methods/methods";
import { ResponseErrorType } from "src/shared/UI/iAlert/types/types";
import useStyles from "./styles/styles";

export interface IAlertProps {
    mode: AlertColor | null;
    isDelete?: boolean;
    message?: string;
    id: string;
    context?: ResponseErrorType;
    closeTime?: number;
}

const IAlert: FC<IAlertProps> = observer(
    ({ mode, isDelete, message = "", context, id, closeTime = 3000 }): JSX.Element => {
        const classes = useStyles();
        const { t } = useTranslation();

        const [isFullMode, setIsFullMode] = useState<boolean>(false);

        const [alertOpen, setAlertOpen] = useState<boolean>(!!mode);

        useEffect(() => {
            setAlertOpen(true);

            if (closeTime > 0) {
                const timer = setTimeout(() => {
                    onCloseAlertHandler();
                }, closeTime);

                return () => {
                    clearTimeout(timer);
                };
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mode]);

        function convertResponseToMessage(data: ResponseErrorType): string {
            const { contextObject } = data || {};
            const { code, id } = contextObject || {};
            const calculatedCode = code || id;

            const convertedType = contextObject?.type
                ? t(`ServerErrorTypes:context.${contextObject.type}`)
                : t(`ServerErrorTypes:context.${data?.context}`);

            const errorCode = !data?.errorCode
                ? convertedType + " " + t(`ServerErrorTypes:operation.${data?.operation}`) // TODO remove this in future
                : getErrorCode(data?.errorCode);
            return t(message || errorCode, {
                ...contextObject,
                convertedType,
                calculatedCode,
            }) as unknown as string;
        }

        const getAlertMessage = () => {
            let errorMessage: string;
            if (message || context) {
                errorMessage = convertResponseToMessage(context as ResponseErrorType);
            } else {
                errorMessage = t(
                    isDelete ? "Shared:AlertMessages.successDelete" : "Shared:AlertMessages.success"
                );
            }

            return updateLongString(errorMessage, isFullMode);
        };

        const onCloseAlertHandler = () => {
            setAlertOpen(false);
            viewStore.deleteAlert(id);
        };

        const alertMessage = getAlertMessage();

        const [isFullModeButtonVisible, setIsFullModeButtonVisible] = useState(
            alertMessage.length > 200 ? true : false
        );

        const onSetFullModeHandler = () => {
            setIsFullModeButtonVisible(false);
            setIsFullMode(true);
        };

        return (
            <Slide
                direction="down"
                in={!!mode && alertOpen}
                mountOnEnter
                className={classes.wrapper}>
                <Alert
                    severity={mode ? mode : "success"}
                    variant={"outlined"}
                    onClose={onCloseAlertHandler}>
                    <AlertTitle className={classes.title}>
                        <strong>{getAlertTitle(mode)}</strong>
                    </AlertTitle>
                    <Typography textOverflow={"ellipsis"} className={classes.description}>
                        {alertMessage.indexOf("\\n") > 0 ? (
                            <div className={classes.messageList}>
                                {alertMessage.split("\\n").map((str, idx) => (
                                    <p key={`alert_line_${idx}`}>{str}</p>
                                ))}
                            </div>
                        ) : (
                            alertMessage
                        )}

                        {isFullModeButtonVisible && (
                            <span className={classes.detailed} onClick={onSetFullModeHandler}>
                                {t("Shared:Detailed")}
                            </span>
                        )}
                    </Typography>
                </Alert>
            </Slide>
        );
    }
);

export default IAlert;
