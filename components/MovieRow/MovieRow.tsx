import {IMovieItem, MovieItem} from "../MovieItem/MovieItem";
import Link from "next/link";
import {useEffect} from "react";


interface IMovieRow{
    results: Array<IMovieItem>
    title: string
    channel?: string
}

export const MovieRow: React.FC<IMovieRow> = ({results, title, channel}) => {

    useEffect(() => {
        const list = document.querySelectorAll('.movie-row__list')
        list.forEach(item => item.addEventListener('wheel', (e: any) => {
            if(e.deltaY > 0){
                item.scrollLeft += 20;
            }else{
                item.scrollLeft -= 20;
            }
            e.preventDefault()
        }))
    }, [])

    return(
        <>
            <div className="movie-row">
                <h2 className="movie-row__title"><Link href={`/channels/${channel}`}><a>{title}</a></Link></h2>
                <div className="movie-row__content">
                    <ul className="movie-row__list">
                        {results.map((result) => (
                            <MovieItem    key={result.id}
                                          id={result.id}
                                          poster_path={result.poster_path}/>
                        ))}
                    </ul>
                </div>
            </div>
            </>
    )
}