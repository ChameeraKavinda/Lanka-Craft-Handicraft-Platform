package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Address;
import com.lankacraft.lankacraft.Model.Order;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Service.OrderService;
import com.lankacraft.lankacraft.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;




    @PostMapping("/")
    public ResponseEntity<Order>createOrder(@RequestBody Address shippingAddress,
                                            @RequestHeader("Authorization")String jwt) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);

        Order orders=orderService.createOrder(user,shippingAddress);

        System.out.println("order"+orders);

        return new ResponseEntity<Order>(orders, HttpStatus.CREATED);
    }


    @GetMapping("/user")
    public ResponseEntity<List<Order>>usersOrderHistory(@RequestHeader("Authorization")String jwt) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);

        List<Order>orders=orderService.userOrderHistory(user.getUser_id());


        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }


    @GetMapping("/{order_id}")
    public ResponseEntity<Order>findOrderById(@PathVariable("order_id") Long orderCode, @RequestHeader("Authorization")String jwt) throws UserException , OrderException {

        User user=userService.findUserProfileByJwt(jwt);

        Order orders=orderService.findOrderById(orderCode);

        return new ResponseEntity<>(orders, HttpStatus.CREATED);
    }








    }
