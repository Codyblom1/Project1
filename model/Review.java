package com.techelevator.model;

import java.time.LocalDate;

public class Review {

    //User Info
    private int userId;
    private String username;
    //Brewery Info
    private String breweryId;
    private String breweryName;
    private String breweryUrl;
    //Review Info
    private String review;
    private int starRating;
    private LocalDate postingDate;

    public Review()
    {}
    public Review(int userId, String username, String breweryId, String breweryName, String breweryUrl, String review, int starRating, LocalDate postingDate) {
        this.userId = userId;
        this.username = username;
        this.breweryId = breweryId;
        this.breweryName = breweryName;
        this.breweryUrl = breweryUrl;
        this.review = review;
        this.starRating = starRating;
        this.postingDate = postingDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(String breweryId) {
        this.breweryId = breweryId;
    }

    public String getBreweryName() {
        return breweryName;
    }

    public void setBreweryName(String breweryName) {
        this.breweryName = breweryName;
    }

    public String getBreweryUrl() {
        return breweryUrl;
    }

    public void setBreweryUrl(String brewerUrl) {
        this.breweryUrl = brewerUrl;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getStarRating() {
        return starRating;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public LocalDate getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(LocalDate postingDate) {
        this.postingDate = postingDate;
    }
}
