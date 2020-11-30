import React from "react";
import Header from "../Header/Header";
import AddRestaurant from "../AddRestaurant/AddRestaurant";
import RestaurantList from "../RestaurantList/RestaurantList";

const HomePage = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default HomePage;
