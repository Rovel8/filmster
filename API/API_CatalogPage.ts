import  axios from 'axios';
import {API_KEY} from "./API_KEY";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const directoryRequests = {
    getGenreList: () => {
        return instance.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`).then(result => result.data)
    }
}