import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING  as string)

const app = express();
app.use(cookieParser());
app.use(express.json()); // automatically converts body of api requests to json
app.use(express.urlencoded({ extended: true })); //parses the url to get params,etc..
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log(err);
            throw err;
        });

        app.listen(process.env.PORT || 7000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed!!!", err);
    });
