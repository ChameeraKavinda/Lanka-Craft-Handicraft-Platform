package com.lankacraft.lankacraft.Request;

import lombok.Data;

@Data
public class PaymentRequest {
    private String productName;
    private Long amount; // in cents
    private Long orderId;
    private  String email;
}
