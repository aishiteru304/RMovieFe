import axios from "../../axiosConfig"

export const getMovies = (moviesName: string | null, page: number) => {
    return axios.get('/api/movies', { params: { moviesName, page } })
}

export const getMovieById = (movieId: string) => {
    return axios.get(`/api/movies/${movieId}`)
}

export const getMovieByCategory = (category: string) => {
    return axios.get(`/api/movies/category/${category}`)
}

export const createReviews = (movieId: string, rating: number, comment: string) => {
    return axios.post('/api/movies/reviews', { rating, comment, movieId })
}