import http from "@/lib/http";

export const authApi = {
    login: (body) => {
        return http.post("/auth/login", body);
    },
    register: (body) => {
        return http.post("/auth/register", body);
    },
}