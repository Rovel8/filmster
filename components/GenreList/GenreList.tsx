import Image from "next/image";
import Link from "next/link";

interface IGenreList{
    genres: Array<IGenreListItem>
}

interface IGenreListItem{
    id: number
    name: string
}

export const GenreList: React.FC<IGenreList> = ({genres}) => {

    return(
        <div className={'genre-list__container'}>
            {genres.map((genre, index) => (
                <div className={'genre-list__item'} key={index}>
                    <div className="genre-list__mask" />
                    <Link href={`/genre/${genre.id}`}>
                        <a className={'genre-list__link'}>
                            <Image
                                className={'genre-list__image'}
                                width={180}
                                height={120}
                                src={`/${genre.name}.jpg`}
                            />
                            <button className={'genre-list__button'}>View</button>
                        </a>
                    </Link>
                    <h2 className={'genre-list__title'}>{genre.name}</h2>
                </div>
            ))}
        </div>
    )
}