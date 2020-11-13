
import Link from "next/link";
import Image from "next/image";

export interface IMovieRowItem {
    backdrop_path: string
    id: number
    poster_path: string
    title: string
}

export const MovieRowItem: React.FC<IMovieRowItem> = ({
    backdrop_path,
    id,
    title,
    poster_path
}) => {
    return (
        <>
            <li className={'movie-item__item'}>
                <Link href={`/movie/${id}`}>
                    <a className={'movie-item__link'}>
                        <Image className={'movie-item__image'}
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
