import express from "express";
import Mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
import { productRoutes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/users.routes.js";
import { cartRoutes } from "./Routes/carts.routes.js";

configDotenv();  // --------- Getting access to the environment variables

const app = express();
const PORT = process.env.PORT || 7000

app.use(express.json())  // --------- Middleware to parse the JSON data.

userRoutes(app) // --------------------- Calling user routes 
cartRoutes(app) // --------------------- Calling cart routes
productRoutes(app) // ------------------ Callinf Product routes

const URI = process.env.MONGO_URI;

Mongoose.connect(URI).then(Success => {
    if (Success) {
        console.log("Connected to MongoDB");
    }

    app.listen(PORT, () => console.log("Server is running..."))
}).catch(Error => {
    console.log("Connection Error: " + Error);
});