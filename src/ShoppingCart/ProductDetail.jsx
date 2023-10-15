import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../Pages/NavbarAdmin';
import { getFirestore, collection, query, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal'; 
function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
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
      await deleteDoc(doc(collection(db, 'products'), '0k2ODUUO'));
      // Update the local state by filtering out the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };
  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Update the Firestore document
      await handleEditProduct(productToEdit.id, {
        title: productToEdit.title,
        price: productToEdit.price,
        description: productToEdit.description,
      });
  
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error saving edit: ', error);
    }
  };

  const handleEditProduct = async (productId, updatedData) => {
    try {
      await updateDoc(doc(productsCollection, '0k2ODUUO'), updatedData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, ...updatedData } : product
        )
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
              onClick={() => openEditModal(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Product"
        ariaHideApp={false} // Opt-out, but not recommended
      >
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        {productToEdit && (
          <form>ss
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={productToEdit.title}
                onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Price"
                value={productToEdit.price}
                onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description"
                value={productToEdit.description}
                onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                type="button"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                type="button"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default ProductDetail;



