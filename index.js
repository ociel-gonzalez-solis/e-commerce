require("dotenv").config();
const express = require("express");

//Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require('yamljs');

///database config
const connectDB = require("./database/database");

//Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const notFound = require("./middleware/404");

const app = express();
app.use(express.json());

app.set("trust proxy", 1);

// extra packages
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 60 * 1000, //15min
    max: 100, // limit each IP to 100req per windowMs.
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 3000;

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
