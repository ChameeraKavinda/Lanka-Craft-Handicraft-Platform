package com.lankacraft.lankacraft.Controller;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Exception.UserException;
import com.lankacraft.lankacraft.Model.Rating;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.RatingRequest;
import com.lankacraft.lankacraft.Service.RatingService;
import com.lankacraft.lankacraft.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating>createRating(@RequestBody RatingRequest req,
                                              @RequestHeader("Authorization")String jwt)throws UserException, ProductExpection{

        User user=userService.findUserProfileByJwt(jwt);

        Rating rating=ratingService.createRating(req,user);

        return  new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{product_id}")
    public ResponseEntity<List<Rating>>getProductsRating(@PathVariable Long product_id,
                                                 @RequestHeader("Authorization")String jwt)throws UserException, ProductExpection{

        User user=userService.findUserProfileByJwt(jwt);

        List<Rating>rating=ratingService.getProductsRating(product_id);

        return  new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

}
