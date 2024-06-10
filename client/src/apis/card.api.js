import http from "@/lib/http";

export const cardApi = {
    create: (data) => {
        return http.post("/card", data);
    },
    getAll: (board_id) => {
        return http.get("/card/all/" + board_id);
    },
    changeOrderCard: (data) => {
        return http.patch("/card/order", data);
    },
    updateCard: (id, data) => {
        return http.patch("/card/" + id, data);
    },
    deleteCard: (id) => {
        return http.delete("/card/" + id);
    }
}