import { request } from "src/shared/request";

const URL = "/userInfo";
export const permissionServiceActions = {
    getList<T>() {
        return request<T>({
            method: "GET",
            url: `${URL}/all`,
            data: {},
            headers: { "Content-Type": "application/json" },
            useMock: false,
        });
    },
};
