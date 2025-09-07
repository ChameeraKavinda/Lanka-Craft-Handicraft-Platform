package com.lankacraft.lankacraft.Service;

import com.lankacraft.lankacraft.Exception.ProductExpection;
import com.lankacraft.lankacraft.Model.Review;
import com.lankacraft.lankacraft.Model.User;
import com.lankacraft.lankacraft.Request.ReviewRequest;

import java.util.List;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user)throws ProductExpection;

    public List<Review>getAllReview(Long product_id);
}
