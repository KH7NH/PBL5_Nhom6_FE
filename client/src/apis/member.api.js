import http from "@/lib/http"

export const memberApi = {
    addMember: async (body) => {
        return http.post(`/member`, body)
    },
    getListMemberInBoard: async (boardId) => {
        return http.get(`/member/${boardId}`)
    }
}