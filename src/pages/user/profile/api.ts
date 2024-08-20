import axios from '../../../axiosConfig'

export const changeAvatar = (formData: FormData) => {
    return axios.patch('/api/users/avatar', formData)
}

export const deleteAccount = () => {
    return axios.delete('/api/users')
}