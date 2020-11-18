import  axios from 'axios';
import {API_KEY} from "./API_KEY";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const searchRequests = {
    searchMovie: (query: string, pageNumber = 1) => {
        return instance.get(`search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}&language=en-US`).then(result => result.data)
    }
}