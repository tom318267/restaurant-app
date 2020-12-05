import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RestaurantFinder from "../../apis/RestaurantFinder";
import "./AddReview.scss";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review,
        rating,
      });
      window.location = location.pathname;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="AddReview mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
