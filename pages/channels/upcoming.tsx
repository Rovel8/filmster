import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import ChannelsView from '../../components/ChannelsView/ChannelsView'
import { GetServerSideProps } from 'next'

function Upcoming({movies, getUrl}) {
    return (
        <>
          <ChannelsView movies={movies} title={'Upcoming'} getUrl={getUrl} />  
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
