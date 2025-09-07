import { memo } from 'react';
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/product/${product.product_id}`)} className="ProductCart w-full max-w-[15rem] m-2 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-center"
          src={product.imageUrl}
          alt="Craft"
        />
      </div>

      <div className='textPart  bg-white p-3'>
        <p className='font-bold opacity-60'>{product.brand}</p>
        <p>{product.title}</p>

        <div className='flex items-center space-x-2'>
          <p className="semibold">
            Rs.{(product.price - product.price * (product.discountPresent / 100)).toFixed(2)}
          </p>
          <p className="line-through opacity-50">
            Rs.{product.price}
          </p>
          <p className='text-green-500 font-semibold'>{product.discountPresent}% off</p>

        </div>
      </div>

    </div>

  );
};

export default memo(ProductCard);