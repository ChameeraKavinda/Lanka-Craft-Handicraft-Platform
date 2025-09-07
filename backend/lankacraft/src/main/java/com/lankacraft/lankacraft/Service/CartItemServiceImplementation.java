package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.CartItemException;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.CartItem;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.CartItemRepo;
import com.lankacraft.lankacraft.Repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CartItemServiceImplementation implements CartItemService {
    private CartItemRepo cartItemRepo;
    private UserService userService;
    private CartRepository cartRepository;


    public  CartItemServiceImplementation(CartItemRepo cartItemRepo,UserService userService,CartRepository cartRepository){
        this.cartItemRepo=cartItemRepo;
        this.userService=userService;
        this.cartRepository=cartRepository;
    }


//    5*100=500
    @Override
    public CartItem createCartItem(CartItem cartItem) {
       cartItem.setQuantity(1);
       cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
       cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountPrice()*cartItem.getQuantity());

       CartItem createdCartItem=cartItemRepo.save(cartItem);

       return createdCartItem;
    }

    @Override
    public CartItem updateCartItem(Long user_id, Long cartItem_id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item=findCartItemById(cartItem_id);
        User user=userService.findUserById(item.getUserId());

//        5*200=100
        if (user.getUser_id().equals(user_id)){
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity()*item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountPrice()*item.getQuantity());
        }
        return cartItemRepo.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, Long user_id) {
        CartItem cartItem=cartItemRepo.isCartItemExist(cart,product,user_id);

        return cartItem;
    }

    @Override
    public void removeCardItem(Long user_id, Long cartItem_id) throws CartItemException, UserException {

        CartItem cartItem=findCartItemById(cartItem_id);
        User user=userService.findUserById(cartItem.getUserId());

        User reqUser=userService.findUserById(user_id);

        if (user.getUser_id().equals(reqUser.getUser_id())){
            cartItemRepo.deleteById(cartItem_id);
        }
        else {
            throw new UserException("You can't remove another users item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItem_id) throws CartItemException {
        Optional<CartItem>opt=cartItemRepo.findById(cartItem_id);

        if (opt.isPresent()){
            return opt.get();
        }
        throw new CartItemException("Cart Item not found with id"+ cartItem_id);

    }
}
