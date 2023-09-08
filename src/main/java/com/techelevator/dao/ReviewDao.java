package com.techelevator.dao;

import com.techelevator.model.Review;

import java.util.List;

public interface ReviewDao {

    List<Review> getAllReviews();

    void createReview(Review review);

    //Review updateReview(Review review);
}
