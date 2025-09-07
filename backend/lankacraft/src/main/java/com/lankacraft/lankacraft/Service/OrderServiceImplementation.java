package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Model.*;
import com.lankacraft.lankacraft.Repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService{

    private final OrderRepo orderRepo;
    private final CartService cartService;
    private final AddressRepo addressRepo;
    private final UserRepo userRepo;
    private final OrderItemService orderItemService;
    private final OrderItemRepo orderItemRepo;

    public  OrderServiceImplementation(OrderRepo orderRepo,CartService cartService,AddressRepo addressRepo,UserRepo userRepo,OrderItemService orderItemService,OrderItemRepo orderItemRepo){

        this.orderRepo=orderRepo;
        this.cartService=cartService;
        this.addressRepo=addressRepo;
        this.userRepo=userRepo;
        this.orderItemService=orderItemService;
        this.orderItemRepo=orderItemRepo;

    }


    @Override
    public Order createOrder(User user, Address shippingAddress) {
        Address newaddress=new Address();
        newaddress.setUser(user);
        newaddress.setFirstName(shippingAddress.getFirstName());
        newaddress.setLastName(shippingAddress.getLastName());
        newaddress.setStreetAddress(shippingAddress.getStreetAddress());
        newaddress.setCity(shippingAddress.getCity());
        newaddress.setState(shippingAddress.getState());
        newaddress.setZipCode(shippingAddress.getZipCode());
        newaddress.setMobile(shippingAddress.getMobile());
        Address address=addressRepo.save(newaddress);
        user.getAddress().add(address);
        userRepo.save(user);


        Cart cart=cartService.findUserCart(user.getUser_id());
        List<OrderItem>orderItems=new ArrayList<>();

        for (CartItem item:cart.getCartItems()){
            OrderItem orderItem=new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscountedPrice(item.getDiscountedPrice());

            OrderItem createdOrderItem=orderItemRepo.save(orderItem);

            orderItems.add(createdOrderItem);
        }

        Order createdOrder=new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountPrice(cart.getTotalDiscountPrice());
        createdOrder.setDiscount(cart.getDiscount());
        createdOrder.setTotalItem(cart.getTotalItem());


        createdOrder.setShippingAddress(address);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setCreatedAt(LocalDateTime.now());

        Order savedOrder=orderRepo.save(createdOrder);

        for(OrderItem item:orderItems){
            item.setOrder(savedOrder);
            orderItemRepo.save(item);
        }

        return savedOrder;
    }

    @Override
    public Order findOrderById(Long order_id) throws OrderException {
        Optional<Order>opt=orderRepo.findById(order_id);

        if (opt.isPresent()){
            return opt.get();
        }
        throw  new  OrderException("order not exist with id"+order_id);
    }

    @Override
    public List<Order> userOrderHistory(Long user_id) {
        List<Order>orders=orderRepo.getUsersOrder(user_id);

        return orders;
    }

    @Override
    public Order placeOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);
        orders.setOrderStatus("PLACED");
        orders.getPaymentDetails().setStatus("COMPLETED");
        return orders;
    }

    @Override
    public Order confirmedOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);
        orders.setOrderStatus("CONFIRMED");
        return orderRepo.save(orders);
    }

    @Override
    public Order shippedOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);
        orders.setOrderStatus("SHIPPED");
        return orderRepo.save(orders);
    }

    @Override
    public Order delivereddOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);
        orders.setOrderStatus("DELIVERED");
        return orderRepo.save(orders);
    }

    @Override
    public Order canceledOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);
        orders.setOrderStatus("CANCELLED");
        return orderRepo.save(orders);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public void deleteOrder(Long order_id) throws OrderException {
        Order orders=findOrderById(order_id);

        orderRepo.deleteById(order_id);

    }
}
