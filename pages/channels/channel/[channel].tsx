import { genreRequests } from "../../../API/API_Genre";
import { genres } from "../../../assets/genres";
import {MovieList} from "../../../components/MovieList/MovieList";

export default function Channels({ movies, getUrl, title }) {

    return (
       <MovieList movies={movies} getUrl={getUrl} title={title} />
    )
}

export async function getServerSideProps(context) {

    const query = context.query.channel
   
    let movies = await genreRequests.getGenreMovies(query)
    let title = await genres.filter(genre => genre.id === +query)[0].name
    let getUrl = `https://api.themoviedb.org/3/discover/movie/?&language=en-US&with_genres=${query}`;


    return {
        props: {
            movies,
            getUrl,
            title
        }
    }
}