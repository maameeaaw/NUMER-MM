import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.99.100:8080/api',
})

export const insertMovie = payload => api.post(`/exam`, payload)
export const getAllMovies = () => api.get(`/exams`)
export const updateMovieById = (id, payload) => api.put(`/exam/${id}`, payload)
export const deleteMovieById = id => api.delete(`/exam/${id}`)
export const getMovieByName = name => api.get(`/exam/${name}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieByName,
}

export default apis