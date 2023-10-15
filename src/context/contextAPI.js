import {createContext,useEffect,useState} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebase'

export const Context=createContext();


export const ContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState();
    useEffect(()=>{
        const unSub=onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user)
    })
    
        return ()=>{
            unSub();
        }
    },[])

    console.log(currentUser)
    return <Context.Provider value={{currentUser}}>
        {children}
    </Context.Provider>  
    
}

