import axios from "../../../axiosConfig"

export const getAllUsers = () => {
    return axios.get("/api/users")
}