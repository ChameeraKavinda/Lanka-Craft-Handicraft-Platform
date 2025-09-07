package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Model.Order;
import com.lankacraft.lankacraft.Response.ApiResponse;
import com.lankacraft.lankacraft.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;


    @GetMapping("/")
    public ResponseEntity<List<Order>>getAllOrdersHandler(){
        List<Order> orders=orderService.getAllOrders();
        return new ResponseEntity<List<Order>>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{order_id}/confirmed")
    public ResponseEntity<Order>ConfirmedOrderHandler(@PathVariable Long order_id,
                                                      @RequestHeader("Authoreization")
                                                      String jwt)throws OrderException{
        Order order=orderService.confirmedOrder(order_id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }


    @PutMapping("/{order_id}/ship")
    public ResponseEntity<Order>ShipOrderHandler(@PathVariable Long order_id,
                                                 @RequestHeader("Authoreization")
                                                    String jwt)throws OrderException{
        Order order=orderService.shippedOrder(order_id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @PutMapping("/{order_id}/deliver")
    public ResponseEntity<Order>DeliverOrderHandler(@PathVariable Long order_id,
                                                    @RequestHeader("Authoreization")
                                                  String jwt)throws OrderException{
        Order order=orderService.delivereddOrder(order_id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }


    @PutMapping("/{order_id}/cancel")
    public ResponseEntity<Order>CancelOrderHandler(@PathVariable Long order_id,
                                                   @RequestHeader("Authoreization")
                                                   String jwt)throws OrderException{
        Order order=orderService.canceledOrder(order_id);
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

    @DeleteMapping("/{order_id}/delete")
    public ResponseEntity<ApiResponse>DeleteOrderHandler(@PathVariable Long order_id,
                                                         @RequestHeader("Authoreization")
                                                         String jwt)throws OrderException{
        orderService.deleteOrder(order_id);
        ApiResponse res= new ApiResponse();
        res.setMessage("order deleted success");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);
    }





}
