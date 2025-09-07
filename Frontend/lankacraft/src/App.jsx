import { useState } from 'react';
import './App.css';
import Navigation from './Customer/Component/Navigation/Navigation';
import HomePage from './Customer/Component/pages/HomePage/HomePage';
import Footer from './Customer/Component/Footer/Footer';
import WorkWithUs from './Customer/Component/WorkWithUs/WorkWithUs';
import Product from './Customer/Component/Product/Product';
import ProductCard from './Customer/Component/Product/ProductCard';
import ProductDetails from './Customer/Component/ProductDetails/ProductDetails';
import Cart from './Customer/Component/Cart/Cart';
import CartItem from './Customer/Component/Cart/CartItem';
import Checkout from './Customer/Component/CheckOut/Checkout';
import DiliveryAddressForm from './Customer/Component/CheckOut/DiliveryAddressForm';
import Order from './Customer/Component/Order/Order';
import OrderDetails from './Customer/Component/Order/OrderDetails';
import { Route, Routes } from 'react-router-dom';
import CustomerRoute from './Routers/CustomerRoute';
import AdminDashboard from './Admin/AdminDashborad';
import ArtisansRouter from './Routers/ArtisansRouter';

function App() {
  const [count, setCount] = useState(0);

  return (


    <div>

      <Routes>
        <Route path='/*' element={<CustomerRoute />}>
        </Route>
        <Route path='/admin' element={<AdminDashboard />}></Route>
        <Route path='/artisans/*' element={<ArtisansRouter />}></Route>


      </Routes>

      <div>

      </div>
      <div>
      </div>
    </div>

  );
}

export default App;
