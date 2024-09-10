import { t } from "i18next";
import { viewStore } from "src/app/store";
import axiosInstance from "./config";
import { Options } from "./types";

type Request = {
    (options: Options): Promise<unknown>;
    <T>(options: Options): Promise<{ data: T; status: number }>;
};

export type ResponseMessage = Record<string, string>;

export const request: Request = async (options: Options) => {
    try {
        const response = await axiosInstance({ ...options });
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ({ response }: any) {
        if (response === undefined || response.status >= 500) {
            viewStore.addAlert({
                alertMode: "error",
                message:
                    response && response.data && response.data.errorMessage
                        ? t(`Shared:AlertMessages.${response.data.errorMessage}`)
                        : t("Shared:AlertMessages.notResponsive"),
                throttleByMessage: true,
            });
            return Promise.reject(response);
        }

        if (response.status >= 400 && !options.preventDefaultAlert) {
            response && response.data && response.data.errorMessage
                ? viewStore.addAlert({
                      alertMode: "error",
                      message: t(`Shared:AlertMessages.${response.data.errorMessage}`),
                      context: response.data,
                  })
                : viewStore.addAlert({ alertMode: "error", context: response.data });
            return Promise.reject(response);
        }

        return Promise.reject(response);
    }
};
