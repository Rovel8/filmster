import {movieRequests} from "../../API/API_MoviePage";
import {HeaderLayout} from "../../components/layouts/HeaderLayout";
import Image from "next/image";
import {FieldTimeOutlined, HeartOutlined} from "@ant-design/icons";
import YouTube from "react-youtube";
import firebase from 'firebase'
import 'firebase/auth'
import { MyContext } from "../_app";
import { useContext } from 'react'

interface IMovie {
    videos: {
        id: number
        results: Array<{
            id: string
            iso_639_1: string
            iso_3166_1: string
            key: string
            name: string
            site: string
            size: number
            type: string
        }>
    }
    query: string
    movie: {
        adult: boolean
        backdrop_path: string
        budget: number
        genres: Array<{ id: number, name: string }>
        homepage: string
        id: number
        imdb_id: string
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        production_companies: Array<{
            id: number
            logo_path: string
            name: string
            origin_country: string
        }>
        production_countries: Array<{ iso_3166_1: string, name: string }>
        release_date: string
        revenue: number
        runtime: number
        spoken_languages: Array<{ iso_639_1: string, name: string }>
        status: string
        tagline: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }
}

export default function Movie({query, movie, videos}: IMovie) {

    let youTubeVideoWidth = '100%';
    let youTubeVideoHeight = '390';

    const context = useContext(MyContext)
    const userId = context.userId

    const addToFavoriteList = () => {
        firebase.firestore().collection('movies').doc(`${movie.id}`).set({
            id: movie.id,
            poster_path: movie.poster_path
        })
        firebase.firestore().doc(`users/${userId}`).set({
            favorites: firebase.firestore.FieldValue.arrayUnion(`${movie.id}`)
        }, {merge: true})
    }

    return (
            <HeaderLayout title={'movie'}>
                <main className="movie__main">
                    <div className="movie__container">
                        <section className="movie__header">
                            <aside className="movie__poster">
                                <Image
                                    className={'movie__image'}
                                    width={260}
                                    height={380}
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                />
                            </aside>
                            <div className="movie__description">
                                <h1 className="movie__title">{movie.title}</h1>
                                 <div className="movie__overview">
                                     <p>{movie.overview}</p>
                                 </div>
                                 <div className="movie__more">
                                        <div className="movie__runtime">
                                         <FieldTimeOutlined />
                                         <span>{movie.runtime} min</span>
                                    </div>
                                    <div className="movie__favorite favorite-movie">
                                       {context.logged &&  <button onClick={() => addToFavoriteList()} className={'favorite-movie__button'}>
                                            <HeartOutlined className={'favorite-movie__icon'} />
                                            <span>Add to favorite</span>
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr/>
                        <section className="movie__body">
                            <div className="movie__player">
                                {
                                    videos.results.length ?
                                        <YouTube
                                            opts={{
                                                width: youTubeVideoWidth,
                                                height: youTubeVideoHeight
                                            }}
                                            videoId={videos.results[0].key}
                                        /> :
                                        ''
                                }
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

    return {
        props: {
            query,
            movie,
            videos
        }
    }
}