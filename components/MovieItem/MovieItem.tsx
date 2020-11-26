import Link from "next/link";
import Image from "next/image";
export interface IMovieItem{
    adult?: boolean
    backdrop_path?: string
    genre_ids?: Array<number>
    id: number
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path:string
    release_date?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
}

export const MovieItem: React.FC<IMovieItem> = ({ id, poster_path, title }) => {

    return (
        <>
            <li className={'movie-item__item'}>
                <Link href={`/movie/${id}`}>
                    <a className={'movie-item__link'}>
                        <Image
                            key={id}
                            className={'movie-item__image'}
                            onError={() => console.log('error')}
                            width={220}
                            alt={title}
                            height={350}
                            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        />
                    </a>
                </Link>
            </li>
        </>
    )
}
