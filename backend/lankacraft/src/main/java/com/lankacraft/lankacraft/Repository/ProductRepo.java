package com.lankacraft.lankacraft.Repository;

import com.lankacraft.lankacraft.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    List<Product> findByArtisanEmail(String artisanEmail);

    @Query("SELECT p FROM Product p " +
            "WHERE (p.category.name = :category OR :category = '') " +
            "AND ( (:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountPrice BETWEEN :minPrice AND :maxPrice) ) " +
            "AND ( :minDiscount IS NULL OR p.discountPresent >= :minDiscount ) " +
            "ORDER BY CASE WHEN :sort = 'price_low' THEN p.discountPrice END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discountPrice END DESC")
    List<Product> filterProducts(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort);


}
