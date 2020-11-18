import {HeaderLayout} from "../../components/layouts/HeaderLayout";

import {directoryRequests} from "../../API/API_CatalogPage";
import {GenreList} from "../../components/GenreList/GenreList";


export default function Directory ({genre}){

    return(
        <HeaderLayout title={'Directory Page'}>
            <main className="directory">
               <GenreList genres={genre.genres} />
            </main>
        </HeaderLayout>
    )
}

export async function getStaticProps() {

    const genre = await directoryRequests.getGenreList()

    return {
        props: {
            genre
        }
    }
}