package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.CartItemException;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.CartItem;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Response.ApiResponse;
import com.lankacraft.lankacraft.Service.CartItemService;
import com.lankacraft.lankacraft.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;


    @DeleteMapping("/{cartItem_id}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItem_id,
                                                      @RequestHeader("Authorization")String jwt) throws UserException, CartItemException {

        User user=userService.findUserProfileByJwt(jwt);
        cartItemService.removeCardItem(user.getUser_id(),cartItem_id);

        ApiResponse res=new ApiResponse();
        res.setMessage("Item Deleted FROM Cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @PutMapping("/{cartItem_id}")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem,
                                                   @PathVariable Long cartItem_id,
                                                   @RequestHeader("Authorization")String jwt) throws UserException, CartItemException {


        User user=userService.findUserProfileByJwt(jwt);
        CartItem updateCartItem=cartItemService.updateCartItem(user.getUser_id(),cartItem_id,cartItem);

        return new ResponseEntity<>(updateCartItem, HttpStatus.OK);

    }

    }
