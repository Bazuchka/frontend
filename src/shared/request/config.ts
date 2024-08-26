import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { authService } from "../services/AuthService";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = window._env_.ALIS_BACKEND__SERVER_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface customInternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
}

axiosInstance.defaults.method = "GET";
axiosInstance.defaults.headers.post = { "Content-Type": "application/json" };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axiosInstance.interceptors.request.use((configuration: AxiosRequestConfig) => {
    if (configuration.baseURL === window._env_.ALIS_BACKEND_MOCK__SERVER_URL) {
        return Promise.resolve(configuration); // no    need Auth for mock server
    }

    if (authService.isLoggedIn()) {
        const cb = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            configuration.headers.Authorization = `Bearer ${authService.getToken()}`;
            return Promise.resolve(configuration);
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return authService.updateToken(cb).catch((err) => {
            console.log(err);
            location.reload();
        });
    } else {
        location.reload();
    }
});

export default axiosInstance;
