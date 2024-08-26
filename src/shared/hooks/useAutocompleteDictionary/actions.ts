import { DefaultSelectOfDictionaryHTTPRequestObject, request } from "../../request";

export const actions = {
    getAll(URL: string, filters = {}, page = 0, size: number, useSorting = true, isMock = false) {
        const baseURL = isMock ? window._env_.ALIS_BACKEND_MOCK__SERVER_URL : undefined;
        const data = {
            filter: useSorting
                ? {
                      ...filters,
                      ...DefaultSelectOfDictionaryHTTPRequestObject.filter,
                  }
                : { ...filters },
            pageInfo: { size, page },
        };

        return request({
            method: isMock ? "GET" : "POST",
            url: `${URL}`,
            baseURL,
            data,
        });
    },
};
