import {HeaderLayout} from "../components/layouts/HeaderLayout";
import {SearchInput} from "../components/SearchInput/SearchInput";
import {MovieRow} from "../components/MovieRow/MovieRow";
import {homeRequests} from "../API/API_HomePage";

export default function Home({popular, upcoming, topRated, dramas, comedy}) {

    return (
        <HeaderLayout title={'Home Page'}>
            <main className={'main'}>
                <section className={'main__search'}>
                    <SearchInput/>
                </section>
                <section className={'main__popular'}>
                    <MovieRow channel={'Most Popular'} title={'MOST POPULAR'} results={popular.results}/>
                </section>
                <section className={'main__new-releases'}>
                    <MovieRow channel={'Upcoming'} title={'UPCOMING'} results={upcoming.results}/>
                </section>
                <section className={'main__top-rated'}>
                    <MovieRow channel={'Top Rated'} title={'TOP RATED'} results={topRated.results} />
                </section>
                <section className={'main__dramas'}>
                    <MovieRow channel={'18'} title={'DRAMAS'} results={dramas.results} />
                </section>
                <section>
                    <MovieRow channel={'35'} title={'COMEDY'} results={comedy.results} />
                </section>
            </main>
        </HeaderLayout>
    )
}

export async function getStaticProps() {

    const popular = await homeRequests.getPopularMovies()
    const upcoming = await homeRequests.getUpcomingMovies()
    const topRated = await homeRequests.getTopRatedMovies()
    const dramas = await homeRequests.getPopularDramas()
    const comedy = await homeRequests.getPopularComedies()

    return {
        props: {
            popular,
            upcoming,
            topRated,
            dramas,
            comedy
        }
    }
}
