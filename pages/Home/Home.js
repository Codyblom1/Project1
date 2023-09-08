import Layout from "../../components/ui/Layout";
import { getBrewery, getAllBreweries, getPageAndNumberOfBreweries, getBreweryBySearch } from "../../api/BreweryApi";
import { useEffect, useState } from "react";
import BreweryCard from "../../components/BreweryCard";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";


const Home = ({ children }) => {
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;
    const [currentListStatus, setCurrentListStatus] = useState(1);
    // 1 = default no search
    const [listOfBreweries, setListOfBreweries] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    // for user input for brewery search
    const [query, setQuery] = useState("");
    
    //const [, setListOfBreweries] = useState([]);

    useEffect( () => {
        const getBreweryList = async () => {
            let data;
            if (currentListStatus === 1 || (currentListStatus===2 && query=== "")) {
             data = await getPageAndNumberOfBreweries(pageNumber, 5);
            }
            else if (currentListStatus === 2 && query !== "") {
                data = await getBreweryBySearch (query, pageNumber, 5);
            }
            if(data !== undefined){
                setListOfBreweries(data);
            }
        }
        getBreweryList();
    },[pageNumber, currentListStatus, query]);




    const handleSearch = (event) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
        setCurrentListStatus(inputValue === "" || inputValue === undefined ? 1 : 2);
    };


    const getBreweries = (event) =>{
        //if (event !== undefined) event.preventDefault();
        let result = getAllBreweries();
        console.log(result);
    }

    const getOneBreweries = (event) =>{
        if (event !== undefined) event.preventDefault();
        let id = "b54b16e1-ac3b-4bff-a11f-f7ae9ddc27e0";
        let result = getBrewery(id);
        console.log(result);
    }

    const getNextPage = (event) => {
        if (event !== undefined) event.preventDefault();
        setPageNumber(pageNumber + 1);
    }

    const getPrevPage = (event) => {
        if (event !== undefined) event.preventDefault();
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

return (
        <Layout>

            <div className = "homepage-style">
                <div className = "bannerHeader" style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'30vh'}}>
                <div className= "style-text" style={{flex: 1}}>
                {currentUser && currentUser.isAuthenticated ? (
            <div>
            <h3>Welcome, {currentUser.username}! Browse through some featured Breweries or use the search function!</h3>
            <p>That's Right for You</p>
            </div>):(<div><h3>Find The Brewery</h3><p id="under-header">That's Right for You</p>
            </div>
                )}
                </div>
                <div className= "landingpage-container">
                    <div className = "landingpage"></div>   
                    </div>
                </div>
            </div>              
        

                <div className= "search-container" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'30vh'}}>
                    <label htmlFor="searchBar" >
                             
                        <input type = "text" 
                        name="myInput" 
                        id = "searchBar" 
                        onChange= {handleSearch}
                        value= {query}
                        // placeholder="Find your brew..."
                        style = {{
                        width:'500px',
                        borderRadius: '10px',
                        marginLeft: '100px'
                        }}
                        />
                        
                        
                    </label>
                    
                    <button id = "genButton" type="submit" onClick={handleSearch}>Search</button>
                    
                </div>  

            <div>
                <p></p>
            </div>
            
            <div>
                {/* <button variant="secondary" onClick={getBreweries}>
                    getAllBreweries
                </button>
                <button variant="secondary" onClick={getOneBreweries}>
                    get ONE Brewery
                </button> */}
                <button id = "genButton" variant="secondary" onClick={getPrevPage}>
                    Prev Page
                </button>
                <button id = "genButton" variant="secondary" onClick={getNextPage}>
                    Next Page
                </button>
            </div>

            <div className="row justify-content-center">
              <div className="card-deck"> 
                {listOfBreweries.map(brewery => (
                    
                  <BreweryCard currentUser={currentUser} brewery={brewery} key={brewery.id}/>
                ))}
              </div>
              
            </div>
            <footer>&copy;2023 BreweryBros, Inc. All rights reserved.</footer>

            {children}
        </Layout>
    );
}
export default Home;    