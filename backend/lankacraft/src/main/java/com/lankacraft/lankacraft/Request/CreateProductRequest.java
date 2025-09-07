package com.lankacraft.lankacraft.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {

    private  String title;
    private String artisanEmail;
    private  String description;
    private  int price;

    private  int discountedPrice;

    private  int discountPresent;

    private  int quantity;
     private  String brand;

     private  String imageUrl;

     private  String topLevelCategory;

    private  String secondLevelCategory;

    private  String thirdLevelCategory;





}
