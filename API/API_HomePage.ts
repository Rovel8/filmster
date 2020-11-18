import  axios from 'axios';
import {API_KEY} from "./API_KEY";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const homeRequests = {
    getPopularMovies: () => {
        return instance.get(`movie/popular?api_key=${API_KEY}&language=en-US&page=1`).then(result => result.data)
    },
    getUpcomingMovies: () => {
        return instance.get(`movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then(result => result.data)
    },
    getTopRatedMovies: () => {
        return instance.get(`movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(result => result.data)
    },
    getPopularDramas: () => {
        return instance.get(`discover/movie?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc&language=en-US&page=1`).then(result => result.data)
    },
    getPopularComedies: () => {
        return instance.get(`discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc&language=en-US&page=1`).then(result => result.data)
    }
}