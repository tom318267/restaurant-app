import React, { useContext, useState } from "react";
import RestaurantFinder from "../../apis/RestaurantFinder";
import { RestaurantsContext } from "../../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(res.data.data.restaurant);
      setName("");
      setLocation("");
      setPriceRange("Price Range");
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="AddRestaurant mb-4">
      <form>
        <div className="form-row">
          <div className="col">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="col">
            <input
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
            />
          </div>
          <div className="col">
            <select
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select mr-sm-2"
              value={priceRange}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
