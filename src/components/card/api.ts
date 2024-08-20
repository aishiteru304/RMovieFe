import axiosWithHeader from "../../axiosConfig"

export const addLike = (movieId: string) => {
    return axiosWithHeader.post('/api/users/like', { movieId })
}