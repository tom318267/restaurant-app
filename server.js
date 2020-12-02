require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );
    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Get a restaurant
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Create a restaurant
app.post("/api/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Update a restaurant
app.put("/api/restaurants/:id", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Add review
app.post("/api/restaurants/:id/addReview", async (req, res) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *;",
      [id, name, review, rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
