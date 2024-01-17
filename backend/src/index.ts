
import express, { Request, Response } from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './db';
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser'
import path from 'path';

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING  as string)

const app = express();
app.use(cookieParser())
app.use(express.json()); // automatically converts body of api requests to json
app.use(express.urlencoded({extended: true})) //parses the url to get params,etc..
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))


app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get('/api/test',async (req: Request, res: Response) => {
    res.json({msg: "helo oyy ok na!"})
})

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });



