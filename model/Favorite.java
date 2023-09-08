package com.techelevator.model;

public class Favorite {
    private int userId;
    private String breweryId;

    public Favorite(int userId, String breweryId) {
        this.userId = userId;
        this.breweryId = breweryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(String breweryId) {
        this.breweryId = breweryId;
    }
}
