import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import {MovieList} from '../../components/MovieList/MovieList'
import { GetServerSideProps } from 'next'

function MostPopular({movies, getUrl}) {
    return (
        <>
          <MovieList movies={movies} title={'Most Popular'} getUrl={getUrl} />  
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    let movies = await homeRequests.getPopularMovies();
    let getUrl = 'https://api.themoviedb.org/3/movie/popular?&language=en-US'
    return{
        props:{
            movies,
            getUrl
        }
    }
}


export default MostPopular
