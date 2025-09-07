package com.lankacraft.lankacraft.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long order_id;


    @Column(name = "fk_order_id")
    private String orderCode;


    @ManyToOne
    private User user;


    @ToString.Exclude
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
    private List<OrderItem>orderItems=new ArrayList<>();

    private LocalDateTime orderDate;

    private  LocalDateTime deliveryDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_address_id")
    private Address shippingAddress;

    @Embedded
    private PaymentDetails paymentDetails =new PaymentDetails();

    private double totalPrice;

    private  Integer totalDiscountPrice;

    private Integer discount;

    private  String orderStatus;

    private int totalItem;

    private LocalDateTime createdAt;


}
