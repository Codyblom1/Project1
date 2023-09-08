import Layout from "../../components/ui/Layout";
import { getBrewery, getAllBreweries, getPageAndNumberOfBreweries, getBreweryBySearch } from "../../api/BreweryApi";
import { useEffect, useState } from "react";
import BreweryCard from "../../components/BreweryCard";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import ScrollToTop from "react-scroll-to-top";



const LandingPage = ({ children }) => {
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
            <section className="main">
                <section className="left">
                    Find <span id = "animation-text" className= "title-color">
                    <span className="brewery-animation"></span>
                    </span> <p className="love-msg">You'll Love.</p>
                    
                    {(currentUser && currentUser.isAuthenticated)?
                        <div>
                            <p className="msg">Start searching now!</p>
                            <a href="/search">
                            <button id="landbutton">Search</button>
                            </a> 
                        </div>
                        :
                        <div>
                            <p className="msg">Sign up and start searching now!</p>
                            <a href="/register">
                            <button id="landbutton">Register</button>
                            </a>
                        </div>
                    }
                </section>
                
                <section className="right">
                <img className = "landingImage" src="https://cdn.dribbble.com/users/1192194/screenshots/3525441/media/38b50bb5ca07a211cdb397b7971146c8.gif" alt="doesntwork" width="100%" />
                </section>
                            
            </section>

            {/* SEARCH PART */}
            
            <section className = "features" id="feature">
            <div className="feat-row">
                <div className="col-2" id="col-1">
                    <img className = "img-size" src="https://assets3.thrillist.com/v1/image/1426737/size/tmg-facebook_social.jpg" alt="map" width="100%"/>
                </div>
                <div className="col-2" >
                    <h4 className = "search-text">Search for your favorite brewery anywhere.</h4>
                    <p className = "sec2format">See terms below.*</p>
                    <a href="/search">
                    <button id="landbutton3">Search</button>
                    </a>
                </div>
                </div>
            </section>



            {/* SLIDER */}


            <div class="slider">
            <input type="radio" name="toggle" id="btn-1" checked/>
            <input type="radio" name="toggle" id="btn-2"/>
            <input type="radio" name="toggle" id="btn-3"/>

            <div class="slider-controls">
              <label for="btn-1"></label>
              <label for="btn-2"></label>
              <label for="btn-3"></label>
            </div>

            <ul class="slides">
              <li class="slide">
                <div class="slide-content">
                  <h2 class="slide-title">Palo Alto Brewing</h2>
                  <p class="slide-text"><b>Cody's Top Pick:</b> Palo Alto Brewing Company grew out of a love for beers with character. Our beers include pale ale, cool beanz, and a kolsch.</p>
                  <a href="http://www.paloaltobrewing.com/" class="slide-link" id= "landbutton4">Learn more</a>
                </div>
                <p class="slide-image">
                  <img src="data:image/png;base64,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" alt="stuff" width="320" height="240"/>
                </p>
              </li>
              <li class="slide">
                <div class="slide-content">
                  <h2 class="slide-title">Flat Stick Pub</h2>
                  <p class="slide-text"><b>Huan's Top Pick:</b> Flatstick was inspired by an idea to create a casual beer focused pub that featured a unique and challenging miniature golf course. We’re passionate about craft beer and supporting our community.</p>
                  <a href="https://flatstickpub.com/" class="slide-link" id= "landbutton4">Learn more</a>
                </div>
                <p class="slide-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROUK7gXBvAcRQqeonOfgNiZV9wcbxs0n6xJq1DTqiffiRVBq_74qnW5EsGnkOmYd-09Cc&usqp=CAU" alt="stuff" width="auto" height="240"/>
                </p>
              </li>
              <li class="slide">
                <div class="slide-content">
                  <h2 class="slide-title">Double Chicken Please</h2>
                  <p class="slide-text"><b>BreweryBros' Top Pick:</b> Inspired by the exploration and experimentation of traditional drinks and dishes in the spirit of hacking design. The Coop at Double Chicken Please offers inventive craft cocktails that deconstruct, redefine and rebuild iconic dishes into liquid form.</p>
                  <a href="https://doublechickenplease.com/story" class="slide-link" id= "landbutton4">Learn more</a>
                </div>
                <p class="slide-image">
                  <img src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-90276000000000000/restaurant_1645818954_180.png" alt="stuff" width="auto" height="240"/>
                </p>
              </li>
            </ul>
            </div>
            
            {/* TESTIMONIALS */}

            <section className='testimonials' id='testimonials'>
                <div className='container'>
                    <h2>Testimonials</h2>
                    <span className='line'></span>
                    <div className='content'>
                        <div className='card'>
                            <img src="https://media.istockphoto.com/id/1205205676/vector/vector-illustration-of-businesswoman-character.jpg?s=612x612&w=0&k=20&c=lsPtV0ATD5SYNzntJRRJD7a5JN6OuSuWV2IwK7Gx7J4=" alt='user1'/>
                            <p>It is not every day that you come across a passionate and trustworthy brewery app! Really well done. Thanks BreweryBros!</p>
                            <p><span>Mary Jane</span></p>
                            <p>Avid Happy Hour Attender</p>
                        </div>
                        <div className='card'>
                            <img src="https://st2.depositphotos.com/29688696/47795/v/450/depositphotos_477950874-stock-illustration-staff-dressed-politely-business-men.jpg" alt='user1'/>
                            <p>In less than 10 mintues I was able to make an account and review my favorite breweries! Fantastic application. Would recommend.</p>
                            <p><span>Jerry Mayne</span></p>
                            <p>Director of Beer Solutions</p>
                        </div>
                        <div className='card'>
                            <img src="https://media.istockphoto.com/id/1205205066/vector/vector-illustration-of-businesswoman-character.jpg?s=612x612&w=0&k=20&c=p-BxAFBvbCKkoKz0jbCe-YGgOKFArFC7MVcGQI28Yig=" alt='user1'/>
                            <p>Brews, breweries, favorites, reviews, everything you can ask for. BreweryBros (BB) have done it once again!</p>
                            <p><span>Jane Mary</span></p>
                            <p>Upcoming Brew Connoisseur</p>
                        </div>
                    </div>
                </div>
            </section>



            <div className="scroll-top">
            <ScrollToTop color="#fdb50c" />
            </div>     

            <footer>&copy;2023 BreweryBros, Inc. All rights reserved.</footer>
        


    </Layout>
    );
}
export default LandingPage;    