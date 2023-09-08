import { utilFetchBrewery } from "../services/utilFetchBrewery";
const fetchWrapper = utilFetchBrewery();

export function getBrewery(id){    
    return fetchWrapper.get(`/breweries/${id}`);
}

export function getAllBreweries(){    
    return fetchWrapper.get(`/breweries?page=5&per_page=10`);
}

export function getPageAndNumberOfBreweries(page, number){    
    return fetchWrapper.get(`/breweries?page=${page}&per_page=${number}`);
}

export function getBreweryByName(name){    
    return fetchWrapper.get(`/breweries?by_name=${name}`);
}

export function getBreweryBySearch(search, page, number){    
    return fetchWrapper.get(`/breweries/search?query=${search}&page=${page}&per_page=${number}`);
}

export function getBreweriesByListOfIds(listOfIds){    
    return fetchWrapper.get(`/breweries?by_ids=${listOfIds}`);
}







// https://api.openbrewerydb.org/v1/breweries/{obdb-id}

