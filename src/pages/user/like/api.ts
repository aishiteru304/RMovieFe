import axios from "../../../axiosConfig"

export const getLiked = () => {
    return axios.get('/api/users/likes')
}

export const removeLiked = (movieId: string) => {
    return axios.patch('/api/users/like', { movieId })
}