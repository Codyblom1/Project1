import {useEffect, useState} from "react";
import Layout from "../../components/ui/Layout";
import { getAllReviews } from "../../api/ReviewApi";
import ReviewCard from "../../components/ReviewCard";


 const Option2 = ({children}) => {
  const [listOfReviews, setListOfReviews] = useState([]);

  useEffect( () => {
    const getReviews = async () => {
      const data = await getAllReviews();
      setListOfReviews(data);
    }
    getReviews();
  },[]);

    return (
      <Layout>
       <h2>Reviews</h2>
      <div className="row justify-content-center">
        <div className="card-deck">
          
          {listOfReviews.map(review => (
            <ReviewCard review={review}/>
            ))}
        </div>
      </div>
      <footer>&copy;2023 BreweryBros, Inc. All rights reserved.</footer>

        {children}
      </Layout>
    );
  }
  export default Option2;
