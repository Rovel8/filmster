import { MyContext } from "../_app";
import { useContext, useEffect, useState } from 'react'
import { Spin } from "antd";
import firebase from 'firebase'
import initFirebase from "../../assets/firebase";
import { HeaderLayout } from "../../components/layouts/HeaderLayout";
import { PersonalItem } from "../../components/PersonalItem/PersonalItem";

initFirebase()

export default function Personal({uid}) {

    const context = useContext(MyContext);
    const [data, setData] = useState<any>({});
    
    useEffect(() => {
        firebase.firestore().doc(`users/${uid}`).onSnapshot(snapshot => {
            if(!snapshot){
                return
            }
            setData(snapshot.data())
        })
    }, [])

    return (
        <HeaderLayout title={'Favorite Movies'}>
            {
                context.initialized ? 
                <main className="favorites__main">
                    <div className="favorites__container">
                        <ul className="favorites__list list-favorites">
                            {data.favorites ? data.favorites.map((movie) => (
                                <PersonalItem key={movie.id} id={movie.id} poster_path={movie.poster_path} />
                            )) : ''}
                        </ul>
                    </div>
                </main>
                :  <Spin />  
            }
        </HeaderLayout>
    );
}

export async function getServerSideProps(context) {
    const uid = context.query.id;
    return{
        props:{
            uid
        }
    }
}