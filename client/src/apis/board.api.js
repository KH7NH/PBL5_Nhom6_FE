import http from "@/lib/http"

export const boardApi = {
    createBoard: (body) => {
        return http.post("/board", body)
    },
    getAllBoards: () => {
        return http.get("/board")
    },
    getAllBoardsShared: () => {
        return http.get("/board/shared")
    }
}