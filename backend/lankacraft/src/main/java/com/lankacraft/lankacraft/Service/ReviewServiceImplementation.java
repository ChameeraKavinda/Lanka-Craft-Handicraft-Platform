package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Product;
import com.lankacraft.lankacraft.Model.Review;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Repository.ProductRepo;
import com.lankacraft.lankacraft.Repository.ReviewRepo;
import com.lankacraft.lankacraft.Request.ReviewRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService {
    private ReviewRepo reviewRepo;
    private ProductService productService;
    private ProductRepo productRepo;

    public  ReviewServiceImplementation(ReviewRepo reviewRepo,ProductService productService,ProductRepo productRepo){

        this.reviewRepo=reviewRepo;
        this.productService=productService;
        this.productRepo=productRepo;


    }


    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductExpection {
        Product product=productService.findProductById(req.getProduct_id());

        Review review=new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());



        return reviewRepo.save(review);
    }

    @Override
    public List<Review> getAllReview(Long product_id) {

        return reviewRepo.getAllProductReview(product_id);
    }
}
