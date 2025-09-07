package com.lankacraft.lankacraft.Request;

import lombok.Data;

import java.util.List;
@Data
public  class OrderConfirmationData {
        private String orderId;
        private String orderDate;
        private int totalQuantity;
        private double totalAmount;
        private List<ProductItem> products;
        private String estimatedDeliveryDate;
        private String supportEmail;
        private String supportPhone;
        private String companyName;


}