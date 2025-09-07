package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Model.OrderItem;
import com.lankacraft.lankacraft.Repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImplementation implements OrderItemService {

    @Autowired
    private OrderItemRepo orderItemRepo;


    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {

        return orderItemRepo.save(orderItem);
    }
}
