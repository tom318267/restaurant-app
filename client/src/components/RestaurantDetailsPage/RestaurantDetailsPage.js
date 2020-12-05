import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import { RestaurantsContext } from "../../context/RestaurantsContext";
import AddReview from "../AddReview/AddReview";
import Reviews from "../Reviews/Reviews";
import StarRating from "../StarRating/StarRating";
import "./RestaurantDetailsPage.scss";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(res.data.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-2">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `${selectedRestaurant.restaurant.count}`
                : "(0)"}
            </span>
          </div>
          <div className="Reviews-container mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
