
import {API_KEY} from "../API/API_KEY";
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
                    <MovieRow title={'MOST POPULAR'} results={popular.results}/>
                </section>
                <section className={'main__new-releases'}>
                    <MovieRow title={'UPCOMING'} results={upcoming.results}/>
                </section>
                <section className={'main__top-rated'}>
                    <MovieRow title={'TOP RATED'} results={topRated.results} />
                </section>
                <section className={'main__dramas'}>
                    <MovieRow title={'DRAMAS'} results={dramas.results} />
                </section>
                <section>
                    <MovieRow title={'COMEDY'} results={comedy.results} />
                </section>
            </main>
        </HeaderLayout>
    )
}

export async function getStaticProps() {

    const popular = await homeRequests.getPopularMovies(API_KEY)
    const upcoming = await homeRequests.getUpcomingMovies(API_KEY)
    const topRated = await homeRequests.getTopRatedMovies(API_KEY)
    const dramas = await homeRequests.getPopularDramas(API_KEY)
    const comedy = await homeRequests.getPopularComedies(API_KEY)

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
