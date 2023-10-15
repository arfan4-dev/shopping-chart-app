import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../Pages/NavbarAdmin';
import { getFirestore, collection, query, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

function ProductDetail() {
  const [products, setProducts] = useState([]);

  // Reference to the Firestore collection
  const db = getFirestore();
  const productsCollection = collection(db, 'products');

  // Fetch data from Firestore
  const fetchData = async () => {
    const querySnapshot = await getDocs(productsCollection);
    const productData = [];
    querySnapshot.forEach((doc) => {
      // Get the data for each product
      productData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // Update the products state with the data from Firestore
    setProducts(productData[0].addProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      // Delete the product document from Firestore
      await deleteDoc(doc(collection(db, 'products'), productId));
      // Update the local state by filtering out the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleEditProduct = async (productId, updatedData) => {
    try {
      // Update the product document in Firestore
      await updateDoc(doc(productsCollection, productId), updatedData);
      // Update the local state with the updated product data
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productId ? { ...product, ...updatedData } : product))
      );
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  };

  return (
    <div>
      <div className="bg-slate-900">
        <NavbarAdmin />
      </div>
      <h2 className="text-3xl font-bold mb-4">Product List</h2>
      <ul className="space-y-4">
        {products.map((product, index) => (
          <li key={index} className="border p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">Title: {product.title}</h3>
            <p className="text-gray-700">Price: ${product.price}</p>
            <p className="text-gray-700">Description: {product.description}</p>
            <p className="text-gray-700">id: {product.id}</p>
            <button onClick={() => deleteProduct(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded mr-2">
              Delete
            </button>
            
            <button
          onClick={() => handleEditProduct(product)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
        >
          Edit
        </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetail;
