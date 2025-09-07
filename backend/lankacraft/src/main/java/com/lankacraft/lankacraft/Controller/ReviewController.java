package com.lankacraft.lankacraft.Controller;


import com.lankacraft.lankacraft.Exception.OrderException;
import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Review;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.ReviewRequest;
import com.lankacraft.lankacraft.Service.ReviewService;
import com.lankacraft.lankacraft.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Review>createReview(@RequestBody ReviewRequest req,
                                              @RequestHeader("Authorization")
                                              String jwt)throws UserException, ProductExpection {

        User user=userService.findUserProfileByJwt(jwt);
        Review review=reviewService.createReview(req,user);

        return new ResponseEntity<>(review, HttpStatus.CREATED);

    }

    @GetMapping("/product/{product_id}")
    public ResponseEntity<List<Review>>getProductsReview(@PathVariable Long product_id)throws UserException, ProductExpection {

        List<Review>reviews=reviewService.getAllReview(product_id);
        return  new ResponseEntity<>(reviews,HttpStatus.ACCEPTED);
    }


    }
