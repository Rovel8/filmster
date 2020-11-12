import axios from 'axios';
import {useEffect, useState} from "react";
import {API_KEY} from "../API/API_KEY";

export default function useGenreMovies (pageNumber: number, genreId: number) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [movies, setMovies] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie/?&language=en-US&with_genres=${genreId}`,
            params: {page: pageNumber, api_key: API_KEY},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(result => {
            setMovies((prevMovies) => {
                return [...prevMovies, result.data.results]
            })
            console.log(result.data)
        }).catch(error => {
            if(axios.isCancel(error)) return
        })
        return () => cancel()
    }, [pageNumber])

}