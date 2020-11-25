import '../styles/globals.css';
import React, {useState, useEffect} from 'react'
import 'firebase/auth'
import firebase from 'firebase'
import Error from "next/error";

interface IContext{
  logged: boolean
  initialized: boolean
  userId: string
  setLogged: (value: boolean) => void
  modal: boolean
  setModal: (value: boolean) => void
}

export const MyContext = React.createContext<Partial<IContext>>({});

function MyApp({ Component, pageProps }) {

  const [logged, setLogged] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [userId, setUserId] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            setUserId(user.uid)
            setLogged(true)
            setInitialized(true)
        }else{
            setLogged(false)
            setInitialized(true)
        }
    })
}, [])

  if(pageProps.error){
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  }

  return (
    <MyContext.Provider value={{logged, setLogged, initialized, userId, modal, setModal}}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}

export default MyApp
