import config from "@/constants/config";
import http from "@/lib/http";
import axios from "axios";

export const uploadApi = {
    uploadImage: (formData) => {
        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getImage: (image) => {
        return axios.get(config.uploadUrl + "/" + image);
    },
}