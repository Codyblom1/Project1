package com.techelevator.dao;

import com.techelevator.model.User;

import java.util.List;

public interface FavoriteDao {

    List<String> getAllFavorites(int userId);

    void addFavorite(int userId, String breweryId);

    void removeFavorite(int userId, String breweryId);
}
