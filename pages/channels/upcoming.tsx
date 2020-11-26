import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import {MovieList} from '../../components/MovieList/MovieList'
import { GetServerSideProps } from 'next'

function Upcoming({movies, getUrl}) {
    return (
        <>
          <MovieList movies={movies} title={'Upcoming'} getUrl={getUrl} />  
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    let movies = await homeRequests.getUpcomingMovies();
    let getUrl = `https://api.themoviedb.org/3/movie/upcoming?&language=en-US`
    return{
        props:{
            movies,
            getUrl
        }
    }
}


export default Upcoming
