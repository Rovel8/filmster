import {HeaderLayout} from "../../components/layouts/HeaderLayout";
import {useState} from "react";
import useGenreMovies from "../../hooks/useGenreMovies";
import {searchRequests} from "../../API/API_Search";
import {MovieRowItem} from "../../components/MovieRowItem/MovieRowItem";
import useLastElement from "../../hooks/useLastElement";


export default function Search({getUrl, search}){

    const [pageNumber, setPageNumber] = useState<number>(1);
    const { loading, error, hasMore, moviesList } = useGenreMovies(pageNumber, getUrl, search.total_results)
    const lastMovieElementRef = useLastElement(hasMore, setPageNumber, loading)

    return(
        <HeaderLayout title={'Search'}>
            <main className={'search'}>
                <div className="search__container">
                    <ul className={'search__list list-search'}>
                        {moviesList.map((movie, index) => {
                            if(moviesList.length === index + 1){
                                return(
                                    <div className={'list-search__item'} key={index} ref={lastMovieElementRef}>
                                        <MovieRowItem title={movie.title}
                                                      poster_path={movie.poster_path}
                                                      id={movie.id} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className={'list-search__item'}>
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

    const query = context.query.query
    const search = await searchRequests.searchMovie(query)
    const getUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`

    return{
        props:{
            getUrl,
            search
        }
    }

}