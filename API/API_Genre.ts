import  axios from 'axios';
import {API_KEY} from "./API_KEY";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const genreRequests = {
    getGenreMovies: (genreId: number, pageNumber = 1) => {
        return instance.get(`discover/movie/?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${pageNumber}`).then(result => result.data)
    }
}