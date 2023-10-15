import "./App.css"; 
import Home from "./Pages/Home";
import Cart from './Pages/Cart'
import Navbar from './ShoppingCart/Navbar'
import { Routes,Route } from "react-router-dom";
import OrderHistory from "./Pages/OrderHistory";
import Registration from "./ShoppingCart/Registration";
import Login from "./ShoppingCart/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminHome from "./Pages/AdminHome";
import ProductDetail from "./ShoppingCart/ProductDetail";

function App() {
  return (
   <div className='App'>
    {/* <div className="bg-slate-900"><Navbar/></div> */}

<Routes>
<Route path="/" exact element={<Registration/>}/>
<Route path='/login' element={<Login/>}/>
<Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute> }/>
<Route path="/adminHome" element={<ProtectedRoute><AdminHome/></ProtectedRoute> }/>
  <Route path="/orderHistory" element={<ProtectedRoute>
    <OrderHistory/></ProtectedRoute> }/>
    <Route path='/productDetail' element={<ProductDetail/>}/>
  <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
</Routes>




   </div>
  );
}

export default App;
