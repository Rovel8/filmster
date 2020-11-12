import React, {useEffect} from "react";
import Image from "next/image";
import './GenreList.less'
import Link from "next/link";
import {Button} from 'antd';

interface IGenreList{
    genres: Array<IGenreListItem>
}

interface IGenreListItem{
    id: number
    name: string
}

export const GenreList: React.FC<IGenreList> = ({genres}) => {

    useEffect(() => {

    })

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
                            <Button type={'primary'} className={'genre-list__button'}>View</Button>
                        </a>
                    </Link>
                    <h2 className={'genre-list__title'}>{genre.name}</h2>
                </div>
            ))}
        </div>
    )
}