import React, { useContext } from 'react'
import { Context } from './contextAPI'
import {Navigate} from 'react-router-dom'
function ProtectedRoute({children}) {
    const {currentUser}=useContext(Context);
    if(!currentUser){
       return <Navigate to='/' /> 
    }
  return children
}

export default ProtectedRoute


