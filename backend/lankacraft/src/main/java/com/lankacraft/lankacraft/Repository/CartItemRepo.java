package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Cart;
import com.lankacraft.lankacraft.Model.CartItem;
import com.lankacraft.lankacraft.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

    @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.product = :product AND ci.userId = :userId")
    CartItem isCartItemExist(@Param("cart") Cart cart,
                             @Param("product") Product product,
                             @Param("userId") Long userId);

}
