package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Long> {

    @Query("Select r from Review r where r.product.product_id=:product_id")
    public List<Review>getAllProductReview(@Param("product_id")Long product_id);
}
