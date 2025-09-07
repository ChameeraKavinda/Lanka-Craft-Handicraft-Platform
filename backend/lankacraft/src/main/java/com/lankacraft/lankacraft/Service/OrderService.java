package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Model.Address;
import com.lankacraft.lankacraft.Model.Order;
import com.lankacraft.lankacraft.Model.User;

import java.util.List;

public interface OrderService {

    public Order createOrder(User user, Address shippingAddress);

    public Order findOrderById(Long order_id) throws OrderException;

    public List<Order> userOrderHistory(Long user_id);
    public Order placeOrder(Long order_id) throws OrderException;

    public Order confirmedOrder(Long order_id) throws OrderException;

    public Order shippedOrder(Long order_id) throws OrderException;

    public Order delivereddOrder(Long order_id) throws OrderException;


    public Order canceledOrder(Long order_id) throws OrderException;

    public List<Order>getAllOrders();

    public  void deleteOrder (Long order_id) throws OrderException;







}
