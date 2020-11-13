import axios from 'axios';
import { useEffect, useState } from "react";
import { API_KEY } from "../API/API_KEY";

export default function useGenreMovies(pageNumber: number, genreId: number, totalResults: number) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [moviesList, setMoviesList] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [moviesCount, setMoviesCount] = useState(totalResults)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie/?&language=en-US&with_genres=${genreId}`,
            params: { page: pageNumber, api_key: API_KEY },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(result => {
            setMoviesList((prevMovies) => {
                return [...prevMovies, ...result.data.results]
            })
            setHasMore(moviesCount > 0)
            setMoviesCount(moviesCount - 20)
        }).catch(error => {
            if (axios.isCancel(error)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])

    return { loading, error, moviesList, hasMore }

}