import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import ChannelsView from '../../components/ChannelsView/ChannelsView'
import { GetServerSideProps } from 'next'

function MostPopular({movies, getUrl}) {
    return (
        <>
          <ChannelsView movies={movies} title={'Most Popular'} getUrl={getUrl} />  
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
