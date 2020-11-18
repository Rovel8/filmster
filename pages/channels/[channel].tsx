import { genreRequests } from "../../API/API_Genre";
import { useState } from "react";
import { MovieRowItem } from "../../components/MovieRowItem/MovieRowItem";
import useGenreMovies from '../../hooks/useGenreMovies';
import {HeaderLayout} from "../../components/layouts/HeaderLayout";
import {genres} from "../../assets/genres";
import {homeRequests} from "../../API/API_HomePage";
import useLastElement from "../../hooks/useLastElement";

export default function Channels({ query, movies, getUrl }) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const { loading, error, hasMore, moviesList } = useGenreMovies(pageNumber, getUrl, movies.total_results)
    const lastMovieElementRef = useLastElement(hasMore, setPageNumber, loading)

    return (
        <HeaderLayout title={'Genre Page'}>
            <main className={'genre__main'}>
                <div className={'genre__container'}>
                    {
                        +query > 1 ? <h1 className={'genre__title'}>{genres.filter(genre => genre.id === +query)[0].name}</h1>
                         : <h1 className={'genre__title'}>{query}</h1>
                    }
                    <ul className={'genre__movies'}>
                        {moviesList.map((movie, index) => {
                            if (moviesList.length === index + 1) {
                                return (
                                    <div className={'genre__item'} key={index} ref={lastMovieElementRef}>
                                        <MovieRowItem title={movie.title}
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className={'genre__item'}>
                                        <MovieRowItem title={movie.title}
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

export async function getServerSideProps(context) {

    const query = context.query.channel
    let getUrl;
    let movies;

    switch (query){
        case 'Most Popular':
            movies = await homeRequests.getPopularMovies();
            getUrl = `https://api.themoviedb.org/3/movie/popular?&language=en-US`;
            break;
        case 'Top Rated':
            movies = await homeRequests.getTopRatedMovies();
            getUrl = `https://api.themoviedb.org/3/movie/top_rated?&language=en-US`;
            break;
        case 'Upcoming':
            movies = await homeRequests.getUpcomingMovies();
            getUrl = `https://api.themoviedb.org/3/movie/upcoming?&language=en-US`;
            break;
        default:
            movies = await genreRequests.getGenreMovies(query)
            getUrl = `https://api.themoviedb.org/3/discover/movie/?&language=en-US&with_genres=${query}`;

    }

    return {
        props: {
            query,
            movies,
            getUrl
        }
    }
}