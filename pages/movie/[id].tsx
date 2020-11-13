import { movieRequests } from "../../API/API_MoviePage";
import { HeaderLayout } from "../../components/layouts/HeaderLayout";
interface IMovie{
    videos: {
        id: number
        results: Array<any>
    }
    query: string
    movie: {
        adult: boolean
        backdrop_path: string
        budget: number
        genres: Array<{id: number, name: string}>
        homepage: string
        id: number
        imdb_id: string
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        production_companies: Array<{id: number, logo_path: string, name: string, origin_country: string}>
        production_countries: Array<{iso_3166_1: string, name: string}>
        release_date: string
        revenue: number
        runtime: number
        spoken_languages: Array<{iso_639_1: string, name: string}>
        status: string
        tagline: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }
}

export default function Movie ({query, movie, videos}: IMovie){

    console.log(query)
    console.log(movie)
    console.log(videos)

    return(
            <HeaderLayout title={'movie'}>
                <main className="movie__main">
                    <div className="movie__container">
                        <section className="movie__header">
                            <aside className="movie__poster">

                            </aside>
                            <div className="movie__title">

                            </div>
                            <div className="movie__description">

                            </div>
                        </section>
                        <section className="movie__body">
                            <div className="movie__player">
                                
                            </div>
                        </section>
                    </div>
                </main>
            </HeaderLayout>
    )
}

export async function getServerSideProps(context) {

    const query = +context.query.id
    const movie = await movieRequests.getMovie(query)
    const videos = await movieRequests.getMovieVideos(query)

    return{
        props:{
            query,
            movie,
            videos
        }
    }
}