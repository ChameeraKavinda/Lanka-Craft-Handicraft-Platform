package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Model.Rating;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.RatingRepo;
import com.lankacraft.lankacraft.Request.RatingRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class RatingServiceImplementation implements RatingService{
    private RatingRepo ratingRepo;
    private ProductService productService;

    public RatingServiceImplementation(RatingRepo ratingRepo,ProductService productService){
        this.ratingRepo=ratingRepo;
        this.productService=productService;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductExpection {

        Product product=productService.findProductById(req.getProductId());

        Rating rating=new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());


        return ratingRepo.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {


        return ratingRepo.getAllProductsRating(productId);
    }
}
