import  axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const homeRequests = {
    getPopularMovies: (apiKey: string) => {
        return instance.get(`movie/popular?api_key=${apiKey}&language=en-US&page=1`).then(result => result.data)
    },
    getUpcomingMovies: (apiKey: string) => {
        return instance.get(`movie/upcoming?api_key=${apiKey}&language=en-US&page=1`).then(result => result.data)
    },
    getTopRatedMovies: (apiKey: string) => {
        return instance.get(`movie/top_rated?api_key=${apiKey}&language=en-US&page=1`).then(result => result.data)
    },
    getPopularDramas: (apiKey: string) => {
        return instance.get(`discover/movie?api_key=${apiKey}&with_genres=18&sort_by=popularity.desc&language=en-US&page=1`).then(result => result.data)
    },
    getPopularComedies: (apiKey: string) => {
        return instance.get(`discover/movie?api_key=${apiKey}&with_genres=35&sort_by=popularity.desc&language=en-US&page=1`).then(result => result.data)
    }
}