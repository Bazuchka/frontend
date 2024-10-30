import { DefaultSelectOfDictionaryHTTPRequestObject, request } from "../../request";

export const actions = {
    getAll(URL: string, filters = {}, page = 0, size: number, useSorting = true) {
        const baseURL = undefined;
        const data = {
            filter: useSorting
                ? {
                      ...DefaultSelectOfDictionaryHTTPRequestObject.filter,
                      ...filters,
                  }
                : { ...filters },
            pageInfo: { size, page },
        };

        return request({
            method: "POST",
            url: `${URL}`,
            baseURL,
            data,
        });
    },
};
