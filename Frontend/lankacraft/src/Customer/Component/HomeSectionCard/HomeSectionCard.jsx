import { memo } from 'react';

const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-[15rem] mx-3 mb-4">
      {/* Image Box */}
      <div className="h-[13rem] w-full flex justify-center items-center bg-gray-50">
        <img
          className="max-h-full max-w-full object-contain"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{product.brand}</p>
      </div>
    </div>
  );
};

export default memo(HomeSectionCard);
