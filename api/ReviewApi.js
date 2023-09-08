import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function addToReviews(review){
    return fetchWrapper.post('/reviews',review);
}
export function getAllReviews(){
    return fetchWrapper.get('/reviews');
}
