package com.techelevator.dao;

import com.techelevator.model.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class JdbcFavoriteDao implements FavoriteDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcFavoriteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<String> getAllFavorites(int userId) {
        List<String> listOfBreweries = new ArrayList<>();
        String sql = " Select * from favorites where user_id = ?; ";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);


        while (results.next()) {
            listOfBreweries.add(results.getString("brewery_id"));
        }

        return listOfBreweries;
    }

    @Override
    public void addFavorite(int userId, String breweryId) {
        String addFavoriteSql = " insert into favorites (user_id, brewery_id) values (?,?); ";
        jdbcTemplate.update(addFavoriteSql, userId, breweryId);
    }

    @Override
    public void removeFavorite(int userId, String breweryId) {
        String removeFavoriteSql = " delete from favorites where user_id = ? and brewery_id = ? ";
        jdbcTemplate.update(removeFavoriteSql, userId, breweryId);
    }


}
