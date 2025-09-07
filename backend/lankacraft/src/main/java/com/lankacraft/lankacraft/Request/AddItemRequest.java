package com.lankacraft.lankacraft.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddItemRequest {

    private Long productId;
    private int quantity;
    private Integer price;
}
