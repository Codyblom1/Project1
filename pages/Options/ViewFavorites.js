import Layout from "../../components/ui/Layout";
import React, { useEffect, useState } from 'react';
import BreweryCard from "../../components/BreweryCard";
import {getAllFavorites, removeFromFavorites} from "../../api/FavoriteApi";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { getBreweriesByListOfIds } from "../../api/BreweryApi";

const ViewFavorites = ({children}) => {
  const userContext = useContext(UserContext);
  const currentUser = userContext.currentUser;
  const { setCurrentListOfFavorites } = useContext(FavoritesContext);
  let favoritesContext = useContext(FavoritesContext);
  let currentListOfFavorites = favoritesContext.currentListOfFavorites;

  const [listOfFavoritesBreweryObjects, setListOfFavoritesBreweryObjects] = useState([]);

  useEffect( () => {
    const getListOfFavorites = async () => {
        //We get list of Brewery IDs from our sql database
        const listOfIds = await getAllFavorites(currentUser.id);
        
        if(listOfIds !== undefined){
          //We set the global variable 
          setCurrentListOfFavorites(listOfIds)
          const data = await getBreweriesByListOfIds(listOfIds);  
          if(data !== undefined){
            setListOfFavoritesBreweryObjects(data);
          }
        }
    }
    getListOfFavorites();
},[currentUser.id, setCurrentListOfFavorites]);
//third dependency might cause infinite loop?       ^
  



  return (
    <Layout>
      <h2>View Your Favorites!</h2>
      <div className="row justify-content-center">
        <div className="card-deck">
          {!listOfFavoritesBreweryObjects||listOfFavoritesBreweryObjects===undefined?"Sorry you dont have any favorites":
          listOfFavoritesBreweryObjects.map(brewery => (
            <BreweryCard currentUser={currentUser} brewery={brewery} key={brewery.id}/>
            ))}
        </div>
      </div>

      <footer>&copy;2023 BreweryBros, Inc. All rights reserved.</footer>

      {children}
    </Layout>
  );
}
export default ViewFavorites;