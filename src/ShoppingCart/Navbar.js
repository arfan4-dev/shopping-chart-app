import React, { useEffect, useState } from "react";
import logo from "../assests/image.png";
import { ImCart } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./spinner.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {getUserRoleByEmail} from './getUserRoleByEmail'
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [getPhoto,setGetPhoto]=useState()
 

  
  const logoutHandler=async()=>{
    try{
        signOut(auth)
    }catch(err){
      console.log('Error in Logout',err)
    }
  }
  
  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src={logo} className="h-20" alt="" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-10 ">
          <NavLink to="/">
            {" "}
            <p>Home</p>{" "}
          </NavLink>
          
          <div className="relative">
            <NavLink to="/cart">
              <div>
                <ImCart className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-green-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                    {cart.length}
                  </span>
                )}
              </div>{" "}
            </NavLink>
          </div>
          {/* Logout Button */}
          <button
          onClick={logoutHandler}
          className="text-slate-100 border border-slate-500 rounded p-2 hover:text-slate-200 hover:border-slate-600 text-base cursor-pointer">
            Logout
          </button>

          <div className='' >
            <img style={{borderRadius:'50%', width:'50px', height:'50px', objectFit:'cover'}} src={'getPhoto'} alt='img'/>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
