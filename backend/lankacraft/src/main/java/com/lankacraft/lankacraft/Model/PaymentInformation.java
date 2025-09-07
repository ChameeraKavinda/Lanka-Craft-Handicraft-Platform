package com.lankacraft.lankacraft.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
public class PaymentInformation {


    @Column(name = "card_holder_name")
    private  String cardholderName;

    @Column(name = "card_number")
    private  String cardNumber;


    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @Column(name = "cvv")
    private String cvv;
}
