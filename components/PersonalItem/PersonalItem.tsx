import Link from "next/link";
import Image from "next/image";
import firebase from 'firebase';
import { MyContext } from "../../pages/_app";
import { useContext } from 'react';

interface IPersonalItem{
    id: number
    poster_path: string
}

export const PersonalItem: React.FC<IPersonalItem> = ({id, poster_path}) => {

    const context = useContext(MyContext)

    const removeItem = () => {
        firebase.firestore().doc(`/users/${context.userId}`).set({
            favorites: firebase.firestore.FieldValue.arrayRemove({id: id, poster_path: poster_path})
        }, {merge: true})
    }
    return (
        <>
            <li className={'personal-item__item'}>
                    <Image
                        key={id}
                        className={'personal-item__image'}
                        width={220}
                        height={350}
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    />
                <div className="personal-item__buttons">
                <Link href={`/movie/${id}`}><button className={'personal-item__view-button'}>View</button></Link>
                    <button onClick={() => removeItem()} className={'personal-item__btn-remove'}>Remove</button>
                </div>
            </li>
        </>
    )
}
