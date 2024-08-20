import axios from '../../../axiosConfig'
import { IAddMovie } from '../../../interface/movie'

export const addMovie = (data: IAddMovie) => {
    const { name, category, language, year } = data
    return axios.post("/api/movies", { name, category, language, year })
}

export const uploadMovie = (formData: FormData, id: string) => {
    return axios.patch(`/api/movies/upload/${id}`, formData)
}

export const getAllMovies = () => {
    return axios.get("/api/movies/all")
}