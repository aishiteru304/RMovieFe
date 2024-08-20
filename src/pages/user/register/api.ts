import axios from "../../../axiosConfig"
import { IUserRegister } from "../../../interface/user"

export const register = (data: IUserRegister) => {
    return axios.post("/api/users", { email: data.email, password: data.password, name: data.name })
}