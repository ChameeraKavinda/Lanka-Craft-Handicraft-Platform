import { Grid } from '@mui/material';
import { memo } from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {

    const navigatie=useNavigate();

  return (
    <div onClick={()=>navigatie(`/account/order/${2}`)} className="shadow-md bg-white rounded-lg p-4">
      <Grid 
        container 
        spacing={2} 
        sx={{ alignItems: "center" }}
      >
        {/* Product */}
        <Grid item xs={12} md={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top rounded-md"
              src="https://crafts.lk/wp-content/uploads/2021/01/web-12-247x296.jpg"
              alt="product"
            />
            <div className="ml-5 space-y-2">
              <p className="font-medium">Title path Necklace</p>
              <p className="text-gray-500 text-sm">Brand</p>
            </div>
          </div>
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={2} className="flex items-center">
          <p className="font-semibold text-gray-800">Rs. 4500</p>
        </Grid>

        {/* Delivery status */}
        <Grid item xs={12} md={4} className="flex items-center">
          {true && (
            <p className="flex items-center gap-2 text-sm ">
              <AdjustIcon sx={{ width: "15px", height: "15px"}} className='text-green-600'  />
              <span>Delivered on August 06</span>
            </p>
          )}
          {false && (
            <p className="text-sm text-gray-500">
              Expected Delivery on August 06
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(OrderCard);
