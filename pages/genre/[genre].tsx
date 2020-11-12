import {genreRequests} from "../../API/API_Genre";
import React, {useEffect, useState} from "react";
import {MovieRowItem} from "../../components/MovieRowItem/MovieRowItem";
import useGenreMovies from '../../hooks/useGenreMovies';

export default function Genre({query, movies}) {

    const [moviesList, setMoviesList] = useState([])
    const [pageNumber, setPageNumber] = useState(3)

    useGenreMovies(pageNumber, query)

    useEffect(() => {
        setMoviesList([...movies.results])
    }, [])

    return(
        <div>
                {moviesList.map((movie, index) => (
                    <MovieRowItem key={index} title={movie.title}
                                  poster_path={movie.poster_path}
                                  id={movie.id} backdrop_path={movie.backdrop_path}/>
                ))}
        </div>
    )
}

export async function getServerSideProps(context) {

    const query = context.query.genre
    const movies = await genreRequests.getGenreMovies(query)

    return {
        props: {
            query,
            movies: movies
        }
    }
}