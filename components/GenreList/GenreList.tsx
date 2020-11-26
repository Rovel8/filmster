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
        <div className={'channels-list__container'}>
            {genres.map((channel, index) => (
                <div className={'channels-list__item'} key={index}>
                    <Link href={`/channels/channel/${channel.id}`}>
                        <a className={'channels-list__link'}>
                            <Image
                                className={'channels-list__image'}
                                width={180}
                                height={120}
                                src={`/${channel.name}.jpg`}
                            />
                            <button className={'channels-list__button'}>View</button>
                        </a>
                    </Link>
                    <h2 className={'channels-list__title'}>{channel.name}</h2>
                </div>
            ))}
        </div>
    )
}