import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Customer/Component/pages/HomePage/HomePage';
import { Card } from '@mui/material';
import Navigation from '../Customer/Component/Navigation/Navigation';
import Footer from '../Customer/Component/Footer/Footer';
import Product from '../Customer/Component/Product/Product';
import ProductDetails from '../Customer/Component/ProductDetails/ProductDetails';
import Cart from '../Customer/Component/Cart/Cart';
import Checkout from '../Customer/Component/CheckOut/Checkout';
import Order from '../Customer/Component/Order/Order';
import OrderDetails from '../Customer/Component/Order/OrderDetails';
import ArtisanRegister from '../Artisan/ArtisanAuth/ArtisanRegister';
import Dashboard from '../Admin/AdminDashborad';
import Success from '../Customer/Component/Payment/PaymentSuccess';
import PayementCancel from '../Customer/Component/Payment/PayementCancel';
import PaymentSuccess from '../Customer/Component/Payment/PaymentSuccess';

const CustomerRoute = () => {
    return (
        <div className="">
            <div>
                <Navigation />

            </div>
            <Routes>
                {/* <Route path='/artisan' element={<ArtisanRegister />}></Route> */}
                <Route path='/login' element={<HomePage />}></Route>
                <Route path='/register' element={<HomePage />}></Route>


                <Route path='/' element={<HomePage />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/:topLevel/:secondLevel/:thirdLevel' element={<Product />}></Route>
                <Route path='/product/:product_id' element={<ProductDetails />}></Route>
                <Route path='/checkout' element={<Checkout />}></Route>
                <Route path='/account/order' element={<Order />}></Route>
                <Route path='/account/order/:orderId' element={<OrderDetails />}></Route>
                <Route path="/success/:order_id/:amount" element={<PaymentSuccess />} />
                <Route path='/cancel' element={<PayementCancel />} />







            </Routes>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default memo(CustomerRoute);