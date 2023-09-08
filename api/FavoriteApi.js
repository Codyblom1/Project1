import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function getAllFavorites(userId){
    return fetchWrapper.get(`/favorite/${userId}`);
}

export function addToFavorites(userBrewPair){
    return fetchWrapper.post('/favorite',userBrewPair);
}

export function removeFromFavorites(userBrewPair){
    return fetchWrapper.delete('/favorite',userBrewPair);
}