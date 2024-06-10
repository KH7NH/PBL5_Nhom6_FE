import http from "@/lib/http"

export const commentApi = {
    createComment: (body) => {
        return http.post("/comment", body)
    },
    getListComment: (cardId) => {
        return http.get(`/comment/${cardId}`)
    },
    deleteComment: (commentId) => {
        return http.delete(`/comment/${commentId}`)
    }
}