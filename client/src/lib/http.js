import axios from "axios";
import { getAccessTokenFromLS } from "../utils/auth";
import config from "../constants/config";
import { toast } from "sonner";

class Http {
    instance;
    accessToken;
    constructor() {
        this.accessToken = getAccessTokenFromLS();
        this.instance = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && config.headers) {
                    config.headers.authorization = `${this.accessToken}`;
                    return config;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        // Add a response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                toast.error(error?.response?.data?.message);
                return Promise.reject(error);
            }
        );
    }
}
const http = new Http().instance;
export default http;