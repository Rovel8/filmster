import { API_KEY } from './API_KEY';
import  axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const movieRequests = {
    getMovie: (movieId: number) => {
        return instance.get(`movie/${movieId}?api_key=${API_KEY}&language=en-US`).then(result => result.data)
    },
    getMovieVideos: (movieId: number) => {
        return instance.get(`movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`).then(result => result.data)
    }
}