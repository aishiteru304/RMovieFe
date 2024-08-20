import axios from "../../../axiosConfig"

export const getTotalUsers = () => {
    return axios.get('/api/users/total')
}

export const getTotalMovies = () => {
    return axios.get('/api/movies/total')
}