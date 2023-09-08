import React from "react";
import {useState} from 'react';
import { addToReviews } from "../api/ReviewApi"; 
import { Stars } from "./ui/Stars.js";


const Popup = ({
  brewery = {
    id:1,
    name: 'Cody\'s Brew'
},
currentUser = {
  id:1,
  username: 'Cain'
},
handleClose
}) => {
  const [review, setReview] = useState('hi');
  const [starRating, setStarRating] = useState(5);

  const handleSubmit =  async () => {
    const userReview = {
      "userId" : currentUser.id ,
      "username" : currentUser.username,
      "breweryId" : brewery.id,
      "breweryName" : brewery.name,
      "breweryUrl" : brewery.website_url,
      "review" : review,
      "starRating" : starRating
    };

    const data = await addToReviews(userReview);

    handleClose();
  }
  
  const doSetReview = (event) => {
    setReview(event.target.value); 
  };
  const doSetStarRating = (value) => {
    setStarRating(value); 
  };



  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <p className = "brewName">{brewery.name}</p>
        <div className = "create">
        <form> 
          <label className="reviewPageStyle">Rate Your Experience:</label>
          <Stars starCount={5} onRatingChange={(value) => doSetStarRating(value)} />
          <label className= "reviewPageStyle">Review:</label>
          <textarea className ="textArea" placeholder = "Consider food, service, and ambiance" required onChange={doSetReview}/>
          <button id = "genButton" onClick={handleSubmit}>
            Post Review
          </button>

        </form>
      </div>


      </div>
    </div>
  );
};
 
export default Popup;