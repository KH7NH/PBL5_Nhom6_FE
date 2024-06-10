import http from "@/lib/http"

export const listApi = {
    createList: (body) => {
        return http.post("/list", body)
    },
    getAllLists: (board_id) => {
        return http.get("/list/all/" + board_id)
    },
    changeOrder: (body) => {
        return http.patch("/list/order", body)
    },
    deleteList: (id) => {
        return http.delete("/list/" + id)
    }
}