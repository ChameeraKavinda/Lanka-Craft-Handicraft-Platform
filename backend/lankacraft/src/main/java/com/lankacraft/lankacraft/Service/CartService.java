package com.lankacraft.lankacraft.Service;


import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public interface CartService {

    public Cart createCart(User user);

    public  String addCartItem(Long user_id, AddItemRequest req) throws ProductExpection;

    public Cart findUserCart(Long user_id);
}
