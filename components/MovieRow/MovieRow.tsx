import './MovieRow.less'
import {IMovieRowItem, MovieRowItem} from "../MovieRowItem/MovieRowItem";
import Link from "next/link";
import {useEffect} from "react";


interface IMovieRow{
    results: Array<IMovieRowItem>
    title: string
}

export const MovieRow: React.FC<IMovieRow> = ({results, title}) => {

    useEffect(() => {
        const list = document.querySelectorAll('.movie-row__list')
        list.forEach(item => item.addEventListener('wheel', (e) => {
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
                <h2 className="movie-row__title"><Link href={'#'}><a>{title}</a></Link></h2>
                <div className="movie-row__content">
                    <ul className="movie-row__list">
                        {results.map((result, index) => (
                            <MovieRowItem key={index}
                                          title={result.title}
                                          backdrop_path={result.backdrop_path}
                                          id={result.id}
                                          poster_path={result.poster_path}/>
                        ))}
                    </ul>
                </div>
            </div>
            </>
    )
}