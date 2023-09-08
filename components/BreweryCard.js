import React from 'react';
import {useState} from 'react';
import {getAllFavorites, addToFavorites, removeFromFavorites} from "../api/FavoriteApi";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import Popup from "./Popup";
const BreweryCard = ({
    brewery = {
        id:1,
        name: 'Cody\'s Brew'
    }
}) => {
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;
    const [isFavorite, setFavorite] = useState(false);
    const { setCurrentListOfFavorites } = useContext(FavoritesContext);
    const favoritesContext = useContext(FavoritesContext);
    const currentListOfFavorites = favoritesContext.currentListOfFavorites;
    const [isOpen, setIsOpen] = useState(false);
    const [showFavoriteButton, setShowFavoriteButton] = useState(true);//true means it should show Favorite button
    const options = {
        width:500,
        height: 300,
        text: brewery.name,
        fontSize: '20'
    }
    const addToFavorite = async () => {
        setFavorite(true);
        const userBrewPair = {
            "breweryId": brewery.id,
            "userId": currentUser.id
        }
        const data = await addToFavorites(userBrewPair);
         const listOfIds = await getAllFavorites(currentUser.id);
        if(listOfIds !== undefined){
          //We set the global variable
          setCurrentListOfFavorites(listOfIds) //
        }
        // const data = await getAllFavorites (userBrewPair);
        // if(data !== undefined){
        // }
    }
    const removeFromFavorite = async () => {
        setFavorite(false);
        const userBrewPair = {
            "breweryId": brewery.id,
            "userId": currentUser.id
        }
        const data = await removeFromFavorites(userBrewPair);
        const listOfIds = await getAllFavorites(currentUser.id);
        if(listOfIds !== undefined){
          //We set the global variable
          setCurrentListOfFavorites(listOfIds)
        }
    }
    const breweryIsFavorite = () => {
        if (currentListOfFavorites !== null) {
            //console.log(currentListOfFavorites)
            return currentListOfFavorites.includes(brewery.id);
        }
        return false;
    }
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const formatPhoneNumber = (number) => {
        if(!number){
            return ""
        }
        const areaCode = number.substring(0, 3);
        const firstPart = number.substring(3, 6);
        const secondPart = number.substring(6, 10);

        return `(${areaCode}) ${firstPart}-${secondPart}`;
    }
    const toggleFavoriteButton = async () => {
        //setShowFavoriteButton(!showFavoriteButton)
        const listOfIds = await getAllFavorites(currentUser.id);
        if(listOfIds !== undefined){
          //We set the global variable
          setCurrentListOfFavorites(listOfIds)
        }
        if (currentListOfFavorites !== null) {
            //console.log(currentListOfFavorites)
            setShowFavoriteButton(!currentListOfFavorites.includes(brewery.id));
        }
        if(showFavoriteButton){
            addToFavorite();
        }
        else{
            removeFromFavorite();
        }
    }
    
    return(
        <div className="card btn">
            <div className="card-body">
                <h4 className="brewerCardStylingFont">{brewery.name}</h4>
                <h6><b>{formatPhoneNumber(brewery.phone)}</b></h6>
                <p>{brewery.address_1} {brewery.city} {brewery.state} {brewery.postal_code} {brewery.country}</p>

                {currentUser && currentUser.isAuthenticated?
                <div>
                    <div>{
                        ((!breweryIsFavorite() && !isFavorite) ? <button id = "genButton2" onClick={addToFavorite}>Favorite</button> : <button id = "genButton2" onClick={removeFromFavorite}>UnFavorite</button>)
                        }
                    </div>
                    <div>
                        {!isOpen && <input id="genButton2"
                           type="button"
                           value="Leave Review"
                           onClick={togglePopup}
                         /> }
                         { isOpen && <Popup
                           brewery = {brewery} currentUser = {currentUser}
                           handleClose={togglePopup}
                         />}
                    </div>
                </div>
                
                : ""}
                {brewery.website_url !== null ? <a href={brewery.website_url}>
                    <button id = "genButton2" className = "websiteButton">Website</button>
                </a>: ""}
                </div>
            </div>
        
    );
}
export default BreweryCard;