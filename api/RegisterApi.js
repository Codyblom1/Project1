import { utilFetchWrapper } from "../services/utilFetchWrapper";
const fetchWrapper = utilFetchWrapper();

export function registerUser(user){
    return fetchWrapper.post('/register',user);
}