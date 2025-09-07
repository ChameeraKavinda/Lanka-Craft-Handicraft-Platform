package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT c FROM Cart c WHERE c.user.user_id = :user_id")
    Cart findByUserId(@Param("user_id") Long user_id);

}
