import axios from "../../axiosConfig"

export const getProfile = () => {
    return axios.get("/api/users/profile")
}
