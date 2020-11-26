import React from 'react'
import { HeaderLayout } from '../layouts/HeaderLayout'
import { MovieRowItem } from '../MovieRowItem/MovieRowItem'
import { useState } from 'react';
import useGenreMovies from '../../hooks/useGenreMovies';
import useLastElement from '../../hooks/useLastElement';

function ChannelsView({movies, getUrl, title}) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const { loading, error, hasMore, moviesList } = useGenreMovies(pageNumber, getUrl, movies.total_results)
    const lastMovieElementRef = useLastElement(hasMore, setPageNumber, loading)

    return (
        <HeaderLayout title={'Genre Page'}>
            <main className={'genre__main'}>
                <div className={'genre__container'}>
                    <h1 className={'genre__title'}>{title}</h1>
                    <ul className={'genre__movies'}>
                        {moviesList.map((movie, index) => {
                            if (moviesList.length === index + 1) {
                                return (
                                    <div className={'genre__item'} key={index} ref={lastMovieElementRef}>
                                        <MovieRowItem
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className={'genre__item'}>
                                        <MovieRowItem
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} />
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

export default ChannelsView
