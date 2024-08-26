import { request } from "../../request";

export const actions = {
    getAll(URL: string) {
        return request({
            method: "POST",
            url: `${URL}`,
            data: {},
        });
    },
};
