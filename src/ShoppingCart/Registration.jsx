import React, { useState } from "react";
import "./Register.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { auth, storage,db } from "../firebase";

const Registration = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);

  function generateRandomId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }
  
  const randomId = generateRandomId();

    async function handleSubmit(e) {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const role=e.target[3].value;
    console.log(displayName, email, password,role);
    //  e.target[0].value=null;
    //  e.target[1].value='';
    //  e.target[2].value='';
    try {
      const res = await  createUserWithEmailAndPassword(auth, email, password);
      generateRandomId()
          const storageRef = ref(storage,'userImages/'+ displayName);

     const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error Observer", error);
          setError("Error uploading image"); // Set an error message
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "customers", randomId), {
              randomId: randomId,
              displayName,
              email,
              role,
              photoURL: downloadURL,
            });

            
          });
        }
      );
    } catch (err) {
      console.error("An error occurred:", err);
      setError("Error creating user"); // Set an error message
    }
    navigate("/login");
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">ShopSwift</h3>
          <span className="registerDesc">
          Elevate Your Shopping Experience with ShopSwift.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <div className="top">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                    onChange={(e) => { 
                      setImg(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="bottom">
              <form className="bottomBox" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="registerInput"
                  minLength='7'
                  required
                />
                 <div className="mb-4">
            
            <select
              id="role"
              name="role"
              className="registerInput min-w-full"
              placeholder='Select Role'
                          >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
                <button type="submit" className="registerButton">
                  Sign Up
                </button>
                <Link to="/login">
                  <button className="loginRegisterButton">
                    Log into Account
                  </button>
                </Link>
                {error && <span>There is an Error</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
