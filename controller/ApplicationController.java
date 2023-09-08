package com.techelevator.controller;

import com.techelevator.dao.FavoriteDao;
import com.techelevator.dao.ReviewDao;
import com.techelevator.model.Favorite;
import com.techelevator.model.Review;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path="/api")
public class ApplicationController {
    /****************************************************************************
     * You application controller code should go here
     ******************************************************************************/

    private FavoriteDao favoriteDao;
    private ReviewDao reviewDao;

    public ApplicationController(FavoriteDao favoriteDao, ReviewDao reviewDao){
        this.favoriteDao = favoriteDao;
        this.reviewDao = reviewDao;
    }

    /**-----------------------------------------------------------
     FUNCTIONS FOR FAVORITES
     -----------------------------------------------------------*/

    @RequestMapping(path = "/favorite/{id}", method = RequestMethod.GET)
    public List<String> get(@PathVariable int id) {

        List<String> listOfBreweries = new ArrayList<>();
        listOfBreweries = favoriteDao.getAllFavorites(id);

        if (listOfBreweries == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No favorites found.");
        } else {
            return listOfBreweries;
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/favorite", method = RequestMethod.POST)
    public void addFavorite(@Valid @RequestBody Favorite favorite) {
        //System.out.println("userID: "+favorite.getUserId() + " brewery ID: " + favorite.getBreweryId());
        favoriteDao.addFavorite(favorite.getUserId(), favorite.getBreweryId());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "/favorite", method = RequestMethod.DELETE)
    public void delete(@RequestBody Favorite favorite) {
        favoriteDao.removeFavorite(favorite.getUserId(), favorite.getBreweryId());
    }

    /**-----------------------------------------------------------
     FUNCTIONS FOR REVIEWS
     -----------------------------------------------------------*/

    @RequestMapping(path = "/reviews", method = RequestMethod.GET)
    public List<Review> getAllReviews() {

        List<Review> reviews = new ArrayList<>();
        reviews = reviewDao.getAllReviews();

        if (reviews == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No reviews found.");
        } else {
            return reviews;
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/reviews", method = RequestMethod.POST)
    public void createReview(@Valid @RequestBody Review review) {
        System.out.println("userID: "+review.getUserId() + " brewery ID: " + review.getBreweryId());

        reviewDao.createReview(review);

    }


    /**
     * Helper method to log API calls made to the server
     *
     * @param message - message to be included in the server log
     */
    public void logAPICall(String message) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss.A");
        String timeNow = now.format(formatter);
        System.out.println(timeNow + "-" + message);

    }
}
