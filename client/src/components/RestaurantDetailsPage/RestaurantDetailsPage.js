import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import { RestaurantsContext } from "../../context/RestaurantsContext";
import StarRating from "../StarRating/StarRating";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(res.data.data.restaurant);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);
  return <div>{selectedRestaurant && <StarRating rating={3.7} />}</div>;
};

export default RestaurantDetailsPage;
