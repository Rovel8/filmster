import React from 'react'
import { homeRequests } from '../../API/API_HomePage';
import ChannelsView from '../../components/ChannelsView/ChannelsView'
import { GetServerSideProps } from 'next'

function TopRated({movies, getUrl}) {
    return (
        <>
          <ChannelsView movies={movies} title={'Top Rated'} getUrl={getUrl} />  
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
