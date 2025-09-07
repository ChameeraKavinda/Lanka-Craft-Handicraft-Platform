package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.CartItemException;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.CartItem;
import com.lankacraft.lankacraft.Model.Product;
import org.springframework.stereotype.Service;


public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateCartItem(Long user_id, Long cartItem_id, CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemExist(Cart cart, Product product,Long user_id);

    public void removeCardItem(Long user_id,Long cartItem_id) throws CartItemException, UserException;

    public CartItem findCartItemById(Long cartItem_id)throws CartItemException;


}
