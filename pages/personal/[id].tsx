import { useRouter } from "next/router";
import { MyContext } from "../_app";
import { useContext } from 'react'
import { Spin } from "antd";
import { GetServerSideProps } from 'next'
import firebase from 'firebase'
import initFirebase from "../../assets/firebase";
import { initializeApp } from "firebase-admin";

export default function Personal() {

    const context = useContext(MyContext)
    const router = useRouter()

    return (
        <div>
            {
                context.initialized ? 
                <main className="personal-page__main">

                </main>
                :  <Spin />  
            }
        </div>
    );
}