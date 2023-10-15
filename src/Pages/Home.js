import React, { useEffect, useState } from 'react'
import { ImSpinner } from 'react-icons/im';
import Spinner from '../ShoppingCart/Spinner';
import Products from '../ShoppingCart/Products';
import Navbar from '../ShoppingCart/Navbar';
const Home = () => {
    const API_URL='https://fakestoreapi.com/products'
const [loading,setLoading]=useState(false);
const [posts,setPost]=useState([]);

    async function getProducts(){
        setLoading(true);
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.log(error);
          setPost([]);
        }
        setLoading(false)

    }

useEffect(() => {
  getProducts()
}, [])


  return (
    <div>
           <div className="bg-slate-900"><Navbar/></div>

       {
  loading ? (
    <Spinner />
  ) : posts.length >0 ? (

    <div className='grid sx:grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh] '>
      {posts.map((post) => (
        <Products key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <div className='flex justify-center items-center'>
      <p>No Data Found</p>
    </div>
  )
}



    </div>
  )
}

export default Home