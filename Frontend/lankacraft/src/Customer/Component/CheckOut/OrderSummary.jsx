import { memo, useEffect, useMemo } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import CartItem from '../Cart/CartItem';
import { Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector(store => store);

  const searchParams = new URLSearchParams(location.search);
  const order_id = searchParams.get("order_id");

  useEffect(() => {
    console.log(order);
    
    if (order_id) {
      dispatch(getOrderById(order_id));
    }
  }, [order_id, dispatch]);

  
  const totalDiscountPrice = useMemo(() => {
    if (order.order?.orderItems?.length) {
      const total = order.order.orderItems.reduce((sum, item) => {
        const discount = item.product?.discountPresent || 0;
        const price = item.product?.price || 0;
        const discountedPrice = price * (1 - discount / 100);
        return sum + discountedPrice * (item.quantity || 1);
      }, 0);
      return total.toFixed(2);
    }
    return (order.order?.totalDiscountPrice || order.order?.totalPrice || 0).toFixed?.(2) || "0.00";
  }, [order.order?.orderItems, order.order?.totalDiscountPrice, order.order?.totalPrice]);

  
  const handleCheckout = async () => {
    if (!order?.order) return;

    try {
      
      const token = localStorage.getItem("jwt");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const res = await fetch("http://localhost:8080/api/payment/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
          productName: "Order " + order.order.order_id,
          orderId:  order.order.order_id,
          amount: Math.round(Number(totalDiscountPrice) * 100), 
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }

      const sessionUrl = await res.text();
      console.log("Stripe session URL:", sessionUrl);

      
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong while creating checkout session.");
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      <div className="Cart bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-5 lg:px-10">

          {/* Cart Items Section */}
          <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
            <Divider className="mb-4" />

            <div className="space-y-5">
              {order.order?.orderItems?.length > 0 ? (
                order.order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
                  >
                    <CartItem item={item} />
                  </div>
                ))
              ) : (
                <p>No items in order.</p>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outlined" color="warning">Continue Shopping</Button>
              <Button variant="contained" color="primary">Update Cart</Button>
            </div>
          </div>

          {/* Price Details Section */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-600 mb-4 uppercase">Cart Totals</h3>
            <Divider className="mb-4" />

            <div className="space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {(order.order?.totalPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Divider />
              <div className="flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span>Rs. {totalDiscountPrice}</span>
              </div>
            </div>

            {/*  Stripe Checkout Button */}
            <Button
              fullWidth
              variant="contained"
              color="success"
              className="mt-6 py-3 text-lg rounded-lg"
              onClick={handleCheckout}
            >
              Proceed to Card Pyement
            </Button>

           

            {/* Coupon Section */}
            <div className="mt-6">
               <Button
              fullWidth
              variant="contained"
              color="success"
              className="mt-6 py-3 text-lg rounded-lg"
              onClick={handleCheckout}
            >
              Cash On Dilivery
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderSummary);
