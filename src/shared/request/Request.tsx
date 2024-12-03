import { t } from "i18next";
import { viewStore } from "src/app/store";
import axiosInstance from "./config";
import { Options } from "./types";

type Request = {
    (options: Options): Promise<unknown>;
    <T>(options: Options): Promise<{ data: T; status: number }>;
};

export type ResponseMessage = Record<string, string>;

interface IAlertParams {
    errorMessage: string;
    throttleByMessage: boolean;
    preventAlert: boolean;
}

const getAlertParams = (
    response: { data: { errorMessage: string }; status: number } | undefined,
    options: Options
): IAlertParams => {
    const hasErrorMessage = response && response.data && response.data.errorMessage;
    const isServerError = response === undefined || response.status >= 500;
    const isClientError = response && response.status >= 400;

    let errorMessage = hasErrorMessage
        ? t(`Shared:AlertMessages.${response.data.errorMessage}`)
        : "";

    let preventAlert = false;

    if (isServerError) {
        errorMessage = hasErrorMessage ? errorMessage : t("Shared:AlertMessages.notResponsive");
    } else if (isClientError) {
        errorMessage = hasErrorMessage ? errorMessage : t("Shared:AlertMessages.wrongParams");
        preventAlert = options.preventDefaultAlert ?? false;
    }

    // todo лучше избавиться от костыля и перейти к получение конкретного errorMessage с BE
    if (response?.status == 409) {
        errorMessage = t("Shared:AlertMessages.itemWithSameIdAlreadyExist");
        preventAlert = options.preventDefaultAlert ?? false;
    }

    return {
        errorMessage,
        preventAlert,
        throttleByMessage: isServerError,
    };
};

export const request: Request = async (options: Options) => {
    try {
        const response = await axiosInstance({ ...options });
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ({ response }: any) {
        const { errorMessage, throttleByMessage, preventAlert } = getAlertParams(response, options);

        !preventAlert &&
            viewStore.addAlert({
                alertMode: "error",
                message: errorMessage,
                throttleByMessage,
            });

        return Promise.reject(response);
    }
};
