import { Button, IconButton, Chip, Snackbar, Alert } from '@mui/material';
import { memo } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { getCart, removeCartItemt, updateCartItemt } from '../../../State/Cart/Action';
import { useState, useEffect } from 'react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState({ open: false, message: '', type: 'success' });

  // Calculate prices
  const originalPrice = item.product.price;
  const discountPercent = item.product.discountPresent || 0;
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  const savings = (originalPrice - discountedPrice) * quantity;
  const totalPrice = discountedPrice * quantity;

  // Show alert message
  const showMessage = (message, type = 'success') => {
    setShowAlert({ open: true, message, type });
  };

  // Update local quantity and dispatch to Redux
  const handleUpdateCartItem = async (num) => {
    const newQuantity = quantity + num;
    if (newQuantity < 1) return;

    setIsUpdating(true);
    setQuantity(newQuantity);
    
    const data = { data: { quantity: newQuantity }, cartItem_id: item.cartItem_id };
    
    try {
      await dispatch(updateCartItemt(data));
      setTimeout(() => {
        dispatch(getCart());
        setIsUpdating(false);
        showMessage('Updated');
      }, 300);
    } catch (error) {
      console.error('Error updating cart item:', error);
      setQuantity(item.quantity);
      setIsUpdating(false);
      showMessage('Error updating', 'error');
    }
  };

  // Remove item from cart
  const handleRemoveCartItem = async () => {
    setIsRemoving(true);
    
    try {
      await dispatch(removeCartItemt(item.cartItem_id));
      setTimeout(() => {
        dispatch(getCart());
        setIsRemoving(false);
        showMessage('Item removed');
      }, 300);
    } catch (error) {
      console.error('Error removing cart item:', error);
      setIsRemoving(false);
      showMessage('Error removing', 'error');
    }
  };

  // Toggle favorite
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showMessage(isFavorite ? 'Unfavorited' : 'Favorited');
  };

  // Sync local quantity with Redux state
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <>
      {/* Compact Mobile/Desktop Layout */}
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 mb-3">
        <div className="flex p-3 space-x-3">
          {/* Compact Product Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                src={item.product.imageUrl}
                alt={item.product.title}
                onError={(e) => {
                  e.target.src = '/placeholder-image.png';
                }}
              />
            </div>
          </div>

          {/* Product Info - Flex 1 */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1 pr-2">
                {item.product.title}
              </h3>
              <IconButton 
                onClick={handleToggleFavorite}
                size="small"
                className="p-1"
              >
                {isFavorite ? (
                  <FavoriteIcon fontSize="small" className="text-red-500" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" className="text-gray-400" />
                )}
              </IconButton>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">
              by <span className="font-medium">{item.product.brand}</span>
            </p>

            {/* Price Row */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-base md:text-lg font-bold text-gray-900">
                Rs. {discountedPrice.toFixed(2)}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-xs text-gray-500 line-through">
                    Rs. {originalPrice.toFixed(2)}
                  </span>
                  <Chip
                    label={`${discountPercent}% OFF`}
                    size="small"
                    className="bg-green-100 text-green-700 h-5 text-xs font-medium"
                  />
                </>
              )}
            </div>

            {/* Savings - Only show if exists */}
            {savings > 0 && (
              <p className="text-xs text-green-600 font-medium mb-2">
                Save Rs. {savings.toFixed(2)}
              </p>
            )}
          </div>

          {/* Right Side - Quantity & Total */}
          <div className="flex flex-col items-end justify-between min-w-[120px]">
            {/* Total Price */}
            <div className="text-right mb-2">
              <div className="text-base md:text-lg font-bold text-gray-900">
                Rs. {totalPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                Rs. {discountedPrice.toFixed(2)} each
              </div>
            </div>

            {/* Compact Quantity Controls */}
            <div className="flex items-center space-x-1 mb-2">
              <IconButton 
                onClick={() => handleUpdateCartItem(-1)} 
                disabled={quantity <= 1 || isUpdating}
                size="small"
                className="p-1 border border-gray-300 hover:bg-gray-50"
              >
                <RemoveCircleOutlineIcon fontSize="small" />
              </IconButton>
              <div className="px-2 py-1 min-w-[35px] text-center text-sm font-semibold bg-gray-50 border border-gray-200 rounded">
                {isUpdating ? '...' : quantity}
              </div>
              <IconButton 
                onClick={() => handleUpdateCartItem(1)}
                disabled={isUpdating}
                size="small"
                className="p-1 border border-gray-300 hover:bg-gray-50"
              >
                <AddCircleIcon fontSize="small" />
              </IconButton>
            </div>

            {/* Remove Button */}
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon fontSize="small" />}
              onClick={handleRemoveCartItem}
              disabled={isRemoving}
              className="text-xs px-2 py-1 min-h-0 h-7"
            >
              {isRemoving ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </div>

        {/* Mobile-only bottom section for better mobile UX */}
        <div className="block md:hidden border-t border-gray-100 px-3 py-2 bg-gray-50">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-bold text-gray-900">Rs. {totalPrice.toFixed(2)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between items-center text-xs text-green-600 mt-1">
              <span>You save:</span>
              <span className="font-semibold">Rs. {savings.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Compact Snackbar for notifications */}
      <Snackbar
        open={showAlert.open}
        autoHideDuration={2000}
        onClose={() => setShowAlert({ ...showAlert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert({ ...showAlert, open: false })} 
          severity={showAlert.type}
          variant="filled"
          sx={{ width: '100%', fontSize: '0.875rem' }}
        >
          {showAlert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(CartItem);