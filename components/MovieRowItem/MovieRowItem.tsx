import './MovieRowItem.less'
import Link from "next/link";
import React from "react";
import Image from "next/image";

export interface IMovieRowItem {
    backdrop_path: string
    id: number
    poster_path: string
    title: string
}

// export interface IPopularItem {
//     adult: boolean
//     backdrop_path: string
//     genre_ids: Array<number>
//     id: number
//     original_language: string
//     original_title: string
//     overview: string
//     popularity: number
//     poster_path: string
//     release_date: string
//     title: string
//     video: boolean
//     vote_average: number
//     vote_count: number
// }


export const MovieRowItem: React.FC<IMovieRowItem> = ({
                                                          backdrop_path,
                                                          id,
                                                          title,
                                                          poster_path
                                                      }) => {
    return (
        <>
            <li className={'movie-item__item'}>
                <Link href={'#'}>
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
