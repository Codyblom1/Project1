package com.techelevator.dao;

import com.techelevator.model.Review;
import com.techelevator.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.time.LocalDate;

@Component
public class JdbcReviewDao implements ReviewDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcReviewDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Review> getAllReviews() {
        List<Review> reviews = new ArrayList<>();
        String addReviewSql = " Select * from reviews; ";
        SqlRowSet results = jdbcTemplate.queryForRowSet(addReviewSql);

        while (results.next()) {
            reviews.add(mapRowToReview(results));
        }
        return reviews;
    }

    @Override
    public void createReview(Review review) {
        String createReviewSql = " insert into reviews (user_id, username, brewery_id, brewery_name, brewery_url, review, star_rating) Values (?,?,?,?,?,?,?) ";
        jdbcTemplate.update(createReviewSql, review.getUserId(), review.getUsername(), review.getBreweryId(), review.getBreweryName(), review.getBreweryUrl(), review.getReview(), review.getStarRating());

        //just in case this is needed for an edit date:
        // Date date = Date.valueOf(LocalDate.of(2019, 01, 10));
    }
    private Review mapRowToReview(SqlRowSet rs) {
        Review review = new Review();
        review.setUserId(rs.getInt("user_id"));
        review.setUsername(rs.getString("username"));
        review.setBreweryId(rs.getString("brewery_id"));
        review.setBreweryName(rs.getString("brewery_name"));
        review.setBreweryUrl(rs.getString("brewery_url"));
        review.setReview(rs.getString("review"));
        review.setStarRating(rs.getInt("star_rating"));
        LocalDate postingDate = (rs.getDate("posting_date")).toLocalDate();
        review.setPostingDate(postingDate);

        return review;
    }

}
