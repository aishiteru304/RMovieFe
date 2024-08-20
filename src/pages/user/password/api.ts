import axios from "../../../axiosConfig"
import { IChangePassword } from "../../../interface/user"

export const changePassword = (data: IChangePassword) => {
    return axios.patch("/api/users/password", { oldPassword: data.oldPassword, newPassword: data.newPassword })
}