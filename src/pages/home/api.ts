import axios from "../../axiosConfig"

export const getAllBanner = () => {
    return axios.get('/api/movies/banner')
}

export const getPopularMovies = () => {
    return axios.get('/api/movies/popular')
}

export const getTopRateMovies = () => {
    return axios.get('/api/movies/toprate')
}