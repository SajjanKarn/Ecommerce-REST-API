require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const API_VERSION = process.env.API_VERSION;

// database
const connectDB = require("./config/db");

// IMPORT routes
const UserRouter = require("./routes/users");
const ProductRouter = require("./routes/products");
const OrderRouter = require("./routes/orders");
const CategoryRouter = require("./routes/categories");

const app = express();

// middlewares.
app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());
app.options("*", cors());

// routes.
app.use(`${API_VERSION}/users`, UserRouter); // user route
app.use(`${API_VERSION}/products`, ProductRouter); // product route
app.use(`${API_VERSION}/orders`, OrderRouter); // order route
app.use(`${API_VERSION}/categories`, CategoryRouter); // category route

// server config
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB(); // async db connection
  console.log(`server running on http://localhost/${PORT}`);
});
