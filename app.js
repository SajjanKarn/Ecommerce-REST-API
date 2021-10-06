require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
app.use("/api/v1", UserRouter); // user route
app.use("/api/v1", ProductRouter); // product route
app.use("/api/v1", OrderRouter); // order route
app.use("/api/v1", CategoryRouter); // category route

// server config
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectDB(); // async db connection
  console.log(`server running on http://localhost/${PORT}`);
});
