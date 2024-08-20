import axios from "../../../axiosConfig"
import { IUserLogin } from "../../../interface/user"

export const login = (data: IUserLogin) => {
    return axios.post("/api/users/login", { email: data.email, password: data.password })
}