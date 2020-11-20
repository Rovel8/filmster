import { useRouter } from "next/router";
import { MyContext } from "../_app";
import { useContext } from 'react'
import { Spin } from "antd";

export default function Personal() {

    const context = useContext(MyContext)
    const router = useRouter()

    if(!context.logged){
        router.push('/')
    }

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