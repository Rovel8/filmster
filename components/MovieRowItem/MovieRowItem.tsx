import Link from "next/link";
import Image from "next/image";
export interface IMovieRowItem {
    id: number
    poster_path: string
    title: string
}

export const MovieRowItem: React.FC<IMovieRowItem> = ({
    id,
    title,
    poster_path
}) => {

    const addDefaultImg = (e) => {
    }

    return (
        <>
            <li className={'movie-item__item'}>
                <Link href={`/movie/${id}`}>
                    <a className={'movie-item__link'}>
                        <Image
                            key={id}
                            className={'movie-item__image'}
                               onError={(e) => addDefaultImg(e)}
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
