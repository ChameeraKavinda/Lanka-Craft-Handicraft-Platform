import { memo } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTracker from './OrderTracker';
import { Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
  return (
    <div className="lg:px-20 px-5">

      {/* Delivery Address */}
      <div className="mb-10">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>

      {/* Order Tracker */}
      <div className="py-10">
        <OrderTracker activeStep={3} />
      </div>

      {/* Multiple Product Cards */}
      {[1, 1, 1, 1].map((item, index) => (
        <div
          key={index}  // ✅ unique key
          className="flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl rounded-md p-5 border bg-white mb-5"
        >
          {/* Product Info */}
          <div className="flex items-center w-full md:w-2/3">
            <img
              className="w-20 h-20 object-cover rounded-md"
              src="https://crafts.lk/wp-content/uploads/2021/01/web-16-247x296.jpg"
              alt="Product"
            />
            <div className="ml-5 space-y-1">
              <p className="font-semibold text-gray-800">Title Path Necklace</p>
              <p className="text-sm text-gray-500">Seller: Name</p>
              <p className="font-medium text-gray-700">Rs. 4,500</p>
            </div>
          </div>

          {/* Rate & Review */}
          <div className="w-full md:w-1/3 mt-3 md:mt-0 flex items-center justify-start md:justify-end">
            <Box sx={{ color: deepPurple[500] }} className="flex items-center cursor-pointer">
              <StarBorderIcon sx={{ fontSize: 28, mr: 1 }} />
              <span className="font-medium text-gray-700">Rate & Review Product</span>
            </Box>
          </div>
        </div>
      ))}

    </div>
  );
};

export default memo(OrderDetails);
