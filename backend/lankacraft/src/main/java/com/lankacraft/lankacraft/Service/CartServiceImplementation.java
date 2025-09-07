package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.CartItem;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.CartRepository;
import com.lankacraft.lankacraft.Request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public  CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,ProductService productService){
        this.cartRepository=cartRepository;
        this.cartItemService=cartItemService;
        this.productService=productService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart=new Cart();
        cart.setUser(user);

        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long user_id, AddItemRequest req) throws ProductExpection {
        Cart cart=cartRepository.findByUserId(user_id);
        Product product=productService.findProductById(req.getProductId());

        CartItem isPresent=cartItemService.isCartItemExist(cart,product,user_id);

        if (isPresent==null){
            CartItem cartItem=new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(user_id);

            int price= req.getQuantity()*product.getDiscountPrice();
            cartItem.setPrice(price);

            CartItem createdCartItem=cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        }
        return "Item Add To Cart";
    }

    @Override
    public Cart findUserCart(Long user_id) {
        Cart cart=cartRepository.findByUserId(user_id);

        int totalPrice=0;
        int totalDiscountPrice=0;
        int totalItem=0;


        for (CartItem cartItem:cart.getCartItems()){
            totalPrice=totalPrice+cartItem.getPrice();
            totalDiscountPrice=totalDiscountPrice+cartItem.getDiscountedPrice();
            totalItem=totalItem+cartItem.getQuantity();
        }

        cart.setTotalDiscountPrice(totalDiscountPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setDiscount(totalPrice-totalDiscountPrice);


        return cartRepository.save(cart);
    }
}
