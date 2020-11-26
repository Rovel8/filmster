import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import {MovieList} from '../../components/MovieList/MovieList'
import { GetServerSideProps } from 'next'

function TopRated({movies, getUrl}) {
    return (
        <>
          <MovieList movies={movies} title={'Top Rated'} getUrl={getUrl} />  
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    let movies = await homeRequests.getTopRatedMovies();
    let getUrl = `https://api.themoviedb.org/3/movie/top_rated?&language=en-US`
    return{
        props:{
            movies,
            getUrl
        }
    }
}


export default TopRated
