import http from "@/lib/http";

export const notifyApi = {
    getListNotify: () => http.get("/notify"),
}