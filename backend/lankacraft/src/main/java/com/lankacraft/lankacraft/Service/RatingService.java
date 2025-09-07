package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Rating;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.RatingRequest;
import org.springframework.stereotype.Service;

import java.util.List;


public interface  RatingService {

    public Rating createRating(RatingRequest req, User user)throws ProductExpection;

    public List<Rating> getProductsRating(Long productId);
}
