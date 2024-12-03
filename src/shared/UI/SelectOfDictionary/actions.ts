import { DefaultPageableHTTPRequestObject, request } from "../../request";
import { Pageable } from "../../request/types";

export const actions = {
    getAll(URL: string, params?: object) {
        return request({
            method: "POST",
            url: `${URL}`,
            data: params || DefaultPageableHTTPRequestObject,
        });
    },

    getAllByFilter(URL: string, body: Pageable) {
        return request({
            method: "POST",
            url: `${URL}`,
            data: body,
        });
    },
};
