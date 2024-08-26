import { GridRowId } from "@mui/x-data-grid";
import { request } from "src/shared/request";
import { BaseActionOptions } from "./types";

export const getBaseActions = <GetParams, SetParams>(URL: string, mock?: boolean) => {
    const baseURL = mock ? window._env_.ALIS_BACKEND_MOCK__SERVER_URL : undefined;

    return {
        fetch<T>(filter?: GetParams, options?: BaseActionOptions) {
            return request<T>({
                method: mock ? "GET" : "POST",
                baseURL,
                url: `${URL}`,
                params: mock ? filter : undefined,
                data: mock ? undefined : filter,
                preventDefaultAlert: options?.preventDefaultAlert,
            });
        },
        create<T>(data: SetParams) {
            return request<T>({
                method: "POST",
                baseURL,
                url: `${URL}/`,
                data: data,
            });
        },
        update<T>(id: GridRowId, data: SetParams) {
            return request<T>({
                method: "PUT",
                baseURL,
                url: `${URL}/${id}`,
                data: data,
            });
        },
        delete<T>(id: GridRowId) {
            return request<T>({
                method: "DELETE",
                baseURL,
                url: `${URL}/${id}`,
                data: {},
            });
        },
        getById<T>(id: GridRowId, options?: BaseActionOptions) {
            return request<T>({
                method: "GET",
                baseURL,
                data: {},
                url: options?.urlPostfix ? `${URL}/${id}/${options.urlPostfix}` : `${URL}/${id}`,
                preventDefaultAlert: options?.preventDefaultAlert,
            });
        },
        uploadFile(data: SetParams, uploadMethod: string) {
            return request({
                method: "POST",
                baseURL,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
                url: `${URL}/${uploadMethod}`,
            });
        },
    };
};
