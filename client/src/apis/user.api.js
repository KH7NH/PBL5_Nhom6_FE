import http from "@/lib/http"

const userApi = {
    searchUser: (params) => {
        return http.get("/user/search", { params })
    }
}

export default userApi