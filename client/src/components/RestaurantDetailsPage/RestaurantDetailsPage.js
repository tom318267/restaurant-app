import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import { RestaurantsContext } from "../../context/RestaurantsContext";
import AddReview from "../AddReview/AddReview";
import Reviews from "../Reviews/Reviews";

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
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
