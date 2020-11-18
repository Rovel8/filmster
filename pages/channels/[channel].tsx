import { genreRequests } from "../../API/API_Genre";
import { useState, useRef, useCallback } from "react";
import { MovieRowItem } from "../../components/MovieRowItem/MovieRowItem";
import useGenreMovies from '../../hooks/useGenreMovies';

import {HeaderLayout} from "../../components/layouts/HeaderLayout";
import {genres} from "../../assets/genres";

export default function Channels({ query, movies }) {

    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef<any>();
    const { loading, error, hasMore, moviesList } = useGenreMovies(pageNumber, query, movies.total_results)
    const lastMovieElementRef = useCallback((node) => {

        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);

    return (
        <HeaderLayout title={'Genre Page'}>
            <main className={'genre__main'}>
                <div className={'genre__container'}>
                    <h1 className={'genre__title'}>{genres.filter(genre => genre.id === +query)[0].name}</h1>
                    <ul className={'genre__movies'}>
                        {moviesList.map((movie, index) => {
                            if (moviesList.length === index + 1) {
                                return (
                                    <div className={'genre__item'} key={index} ref={lastMovieElementRef}>
                                        <MovieRowItem title={movie.title}
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} backdrop_path={movie.backdrop_path} />
                                    </div>

                                )
                            } else {
                                return (
                                    <div key={index} className={'genre__item'}>
                                        <MovieRowItem title={movie.title}
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} backdrop_path={movie.backdrop_path} />
                                    </div>
                                )
                            }

                        })}
                    </ul>
                </div>
            </main>
        </HeaderLayout>
    )
}

export async function getServerSideProps(context) {

    const query = context.query.genre
    const movies = await genreRequests.getGenreMovies(query)

    if(query === 'mostPopular'){

    }

    return {
        props: {
            query,
            movies: movies
        }
    }
}