import {searchRequests} from "../../API/API_Search";
import {MovieList} from "../../components/MovieList/MovieList";


export default function Search({getUrl, movies}){

    return(
       <MovieList movies={movies} getUrl={getUrl} />
    )
}


export async function getServerSideProps(context) {

    const query = context.query.query
    const movies = await searchRequests.searchMovie(query)
    const getUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`

    return{
        props:{
            getUrl,
            movies
        }
    }

}