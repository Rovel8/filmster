import '../styles/globals.css';
import React, {useState, useEffect} from 'react'
import 'firebase/auth'
import firebase from 'firebase'

interface IContext{
  logged: boolean
  initialized: boolean
  setLogged: (value: boolean) => void
}

export const MyContext = React.createContext<Partial<IContext>>({});

function MyApp({ Component, pageProps }) {

  const [logged, setLogged] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            console.log(user)
            setLogged(true)
            setInitialized(true)
        }else{
            console.log('there is not user')
            setLogged(false)
            setInitialized(true)
        }
    })
}, [])

  return (
    <MyContext.Provider value={{logged, setLogged, initialized}}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}

export default MyApp
