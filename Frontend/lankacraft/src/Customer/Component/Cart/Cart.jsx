import { memo, useEffect, useMemo } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  // Refetch cart when cartItems change
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Fallback calculation for totalDiscountPrice
  const totalDiscountPrice = useMemo(() => {
    return (
      cart?.cartItems?.reduce((total, item) => {
        const discount = item.product?.discountPresent || 0;
        const discountedPrice = item.product?.price * (1 - discount / 100);
        return total + discountedPrice * item.quantity;
      }, 0).toFixed(2) || cart.totalDiscountPrice || 0
    );
  }, [cart.cartItems, cart.totalDiscountPrice]);

  return (
    <div className="Cart bg-gray-50 min-h-screen mt-10">
      {/* Add proper spacing from navbar */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {/* Main Cart Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Items ({cart?.cartItems?.length || 0})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart?.cartItems?.length > 0 ? (
                    cart.cartItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <CartItem item={item} />
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a2 2 0 002 2h8m-5-8v4m0-4V9a2 2 0 012-2h2m-4 6h.01" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Looks like you haven't added anything to your cart yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => navigate('/')} 
                      variant="outlined" 
                      color="primary"
                      className="flex-1 py-3 text-sm sm:text-base"
                      fullWidth={false}
                    >
                      Continue Shopping
                    </Button>
                    <Button 
                      onClick={() => navigate('/wood/decor')} 
                      variant="contained" 
                      color="primary"
                      className="flex-1 py-3 text-sm sm:text-base"
                      fullWidth={false}
                    >
                      Browse Products
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Order Summary
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          Rs. {cart?.cart?.totalPrice?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">
                          - Rs. {(cart?.cart?.totalPrice - totalDiscountPrice).toFixed(2) || '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {totalDiscountPrice}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <div className="p-6 border-t border-gray-200">
                    <Button
                      onClick={handleCheckout}
                      fullWidth
                      variant="contained"
                      color="success"
                      className="py-4 text-base font-medium rounded-xl"
                      disabled={!cart?.cartItems?.length}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>

                  {/* Coupon Section */}
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Have a coupon code?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <Button 
                          variant="outlined" 
                          color="success"
                          className="px-6 py-3 text-sm whitespace-nowrap"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                      <p className="text-xs text-gray-500">Your data is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);