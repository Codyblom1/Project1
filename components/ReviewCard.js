import React from 'react';
import {useState, useEffect} from 'react';
import { Stars } from "./ui/Stars.js";
import beerIcon from '../images/beer-svgrepo-com (1).svg';
import img1 from "../images/headshotrand3.jpg";
import img2 from '../images/headshotrand1.jpg';
import img3 from '../images/headshotrand4.jpg';
import img4 from '../images/headshotrand2.jpg';
import img5 from '../images/headshotrand5.jpg';
import img6 from '../images/headshotrand6.jpg';

const ReviewCard = ({
    review 
}) => {
    const options = {
        width:500,
        height: 300,
        text: review.username,
        fontSize: '20'
    }
    const [backgroundImage, setBackgroundImage] = useState('');

    const renderBeerIcons = () => {
        let icons = [];
        for (let i = 0; i < review.starRating; i++) {
            icons.push(<img src={beerIcon} alt="Beer Icon" key={i} width="50px" height="50px" />);
        }
        return icons;
    };
    useEffect(() => {
        const images = [img1, img2, img3, img4, img5, img6];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBackgroundImage(randomImage);
    }, []);

    const cardStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'small',
        backgroundPosition: 'center',
        borderRadius: '50%',
        width: '180px',  
        height: '180px',
        
        
    };

    return(
        <div className="card btn">
            <div className="brewerCard">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={cardStyle}>
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: '200px' }}>
                    <h4 className="brewerCardStylingFont">{review.username}'s honest review</h4>
                        <p > <b>Date Posted:</b> {review.postingDate} </p>
                        <h6><b>Brewery:</b> ({review.breweryName})</h6>
                        <p><b>Review:</b> {review.review}</p>
                        <div style={{ marginBottom: '20px' }}> {/* adds space on bottom*/}
                            <b>Rating:</b> {renderBeerIcons()}
                        </div>
                        
                            {review.website_url !== null ? 
                                <a href={review.website_url}>
                                    <button text id="genButton">Website</button>
                                </a> 
                            : ""}
                    </div>
                    
                </div>
            </div>
        </div>
    );
    
    
    
    
    
    
}
export default ReviewCard;