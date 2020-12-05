import React from "react";
import StarRating from "../StarRating/StarRating";
import "./Reviews.scss";

const Reviews = ({ reviews }) => {
  return (
    <div className="Reviews row row-cols-3 mb-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{ maxWidth: "30%" }}
          className="card-div card text-white bg-primary mb-3 mr-4"
        >
          <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
