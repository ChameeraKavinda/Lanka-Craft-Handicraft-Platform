package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo extends JpaRepository<Rating,Long> {

    @Query("SELECT r From Rating r Where r.product.product_id=:product_id")
    public List<Rating>getAllProductsRating(@Param("product_id")Long product_id);
}
