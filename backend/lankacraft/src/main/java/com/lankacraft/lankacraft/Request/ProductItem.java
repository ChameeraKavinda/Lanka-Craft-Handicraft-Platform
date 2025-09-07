package com.lankacraft.lankacraft.Request;

import lombok.Data;

@Data
public  class ProductItem {
        private String name;
        private String description;

        private String material;

        private double price;
        private int quantity;
        

    }