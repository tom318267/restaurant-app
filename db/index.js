const { Pool } = require("pg");

const pool = new Pool({
  user: "thomasrago",
  host: "localhost",
  database: "restaurantapp",
  password: process.env.PGPASSWORD,
  port: 5432,
});

module.exports = pool;
