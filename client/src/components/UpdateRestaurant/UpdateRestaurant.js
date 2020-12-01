import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  let history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await RestaurantFinder.get(`/${id}`);
      console.log(res.data.data);
      setName(res.data.data.restaurant.name);
      setLocation(res.data.data.restaurant.location);
      setPriceRange(res.data.data.restaurant.price_range);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push("/");
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2 className="text-center mt-5">Update Restaurant</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            type="text"
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            id="location"
            type="text"
            value={location}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price-range">Price Range</label>
          <input
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-control"
            id="price-range"
            type="number"
            value={priceRange}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
