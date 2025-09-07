package com.lankacraft.lankacraft.Controller;


import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.AddItemRequest;
import com.lankacraft.lankacraft.Response.ApiResponse;
import com.lankacraft.lankacraft.Service.CartService;
import com.lankacraft.lankacraft.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart>findUserCart(@RequestHeader("Authorization")String jwt)throws UserException{
        User user=userService.findUserProfileByJwt(jwt);
        Cart cart=cartService.findUserCart(user.getUser_id());

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);

    }


    @PutMapping("/add")
    public ResponseEntity<ApiResponse>addItemToCart(@RequestBody AddItemRequest req,
                                                    @RequestHeader("Authorization")String jwt)throws UserException, ProductExpection {

        User user=userService.findUserProfileByJwt(jwt);

        cartService.addCartItem(user.getUser_id(),req);

        ApiResponse res=new ApiResponse();
        res.setMessage("Item added to Cart");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);
    }
}
