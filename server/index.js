import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
//local imports
import { port } from "./config.js";
import { usersRoute } from "./routes/users.js";

import connectDb from "./config.js";
import { reviewsRoute } from "./routes/reviews.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.SERVER_CLIENT,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
//
app.use("/auth", usersRoute);
app.use("/reviews", reviewsRoute);

connectDb(() => {
  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
});

// const greetings = {
//   name: "Andrew",
//   greet: function () {
//     return console.log(`hello ${this.name}, welcome to our space`);
//   },
// };

// greetings.greet();
