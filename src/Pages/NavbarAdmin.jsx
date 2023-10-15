import logo from "../assests/image.png";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavbarAdmin = () => {
 

  
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
        <NavLink to="#">
          <div className="ml-5">
            <img src={logo} className="h-20" alt="" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-10 ">
        <NavLink to="/productDetail">
            {" "}
            <p>Products Detail</p>{" "}
          </NavLink>
          <NavLink to="/orderHistory">
            {" "}
            <p>Order History</p>{" "}
          </NavLink>
          
       
          {/* Logout Button */}
          <button
          onClick={logoutHandler}
          className="text-slate-100 border border-slate-500 rounded p-2 hover:text-slate-200 hover:border-slate-600 text-base cursor-pointer">
            Logout
          </button>

        
        </div>
      </nav>
    </div>
  );
};

export default NavbarAdmin;
