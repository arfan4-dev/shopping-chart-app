import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from "../ShoppingCart/cartItem";
import "./cart.css";
import Navbar from "../ShoppingCart/Navbar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const Cart = () => {
  const [netPrice, setNetPrice] = useState(0);
  const { cart } = useSelector((state) => state);
  const [addProducts,setAddProducts]=useState([])

  console.log("Printing Cart");
  console.log(cart);

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
 async function addProduct (){
  generateRandomId();
  setAddProducts(cart)
    await setDoc(doc(db, "products", randomId), {
      addProducts
    });
  }
  useEffect(() => {
    setNetPrice(cart.reduce((acc, curr) => acc + curr.price, 0));
    addProduct()
  }, [cart]);
  return (
    <div>
                 <div className="bg-slate-900"><Navbar/></div>

      {cart.length > 0 ? (
        <div>
          <div className="flex ">
            <div>
              {cart.map((item, index) => (
                <CartItem key={item.id} itemIndex={index} item={item} />
              ))}
            </div>
            <div>
              <div className="flex flex-col  mt-16">
                <div>
                  <div className="uppercase font-bold text-green-600 text-lg">
                    Your cart
                  </div>
                  <div className="uppercase font-bold text-green-700 text-4xl">
                    Summary
                  </div>

                  <p className="mt-4">
                    <span className="font-bold text-green-900 text-lg">
                      Total Items:{cart.length}{" "}
                    </span>
                  </p>
                </div>

                <div className="mr-52">
                  <div>
                    <p className="text-gray-700 font-semibold text-lg">
                      Total Price{" "}
                      <span className="text-black font-bold">:${netPrice}</span>
                    </p>
                  </div>

                  <div>
                    <NavLink to="/home">
                      <button onClick={addProduct} className="button-37 mt-4 mb-4">
                        Checkout Now
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-auto justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-gray-700 font-semibold text-lg">Cart Empty</h1>
            <NavLink to="/home">
              <button className="button-37 mt-4">Shop Now</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
