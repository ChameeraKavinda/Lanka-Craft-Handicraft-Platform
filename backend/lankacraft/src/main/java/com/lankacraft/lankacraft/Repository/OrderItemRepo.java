package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Order;
import com.lankacraft.lankacraft.Model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepo extends JpaRepository<OrderItem,Long> {
    List<OrderItem> findByOrder(Order order);
}
