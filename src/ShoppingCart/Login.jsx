import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getUserRoleByEmail } from "./getUserRoleByEmail";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
        // Get the user's role based on their email
        const userRole = await getUserRoleByEmail(email);

        if (userRole==='admin') {
          // Do something with the user's role (e.g., store it in your state or context)
                  navigate('/adminHome')

          console.log('User Role:', userRole);
        } else if(userRole==='user') {
          navigate('/home')
          console.log('User Role:', userRole);

        } else{
return <h2 className='text-2xl font-semibold mb-6'>
  User not found or no role associated
</h2>
        }
      // navigate("/home");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ShopSwift</h3>
          <span className="loginDesc">
          Elevate Your Shopping Experience with ShopSwift.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="bottom">
              <form className="bottomBox" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="loginInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="loginInput"
                  minLength={7}
                  required
                />

                <button type="submit" className="loginButton">
                  Sign In
                </button>
                <Link to="/">
                  <button className="loginRegisterButton">
                    Create a New Account
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;