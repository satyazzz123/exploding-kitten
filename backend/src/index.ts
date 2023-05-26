import express, { Express } from "express";
import mongoose from 'mongoose';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/user";
import redisClient from "./redisClient";

/* CONFIG */
// dotenv.config();
const app:Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("short"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROUTES */
app.use("/users", userRoutes);
mongoose.connect("mongodb+srv://beherasatyajit716:satya1234@score.ex9wdjt.mongodb.net/recipes?retryWrites=true&w=majority")
app.listen(8001, ()=>{
    console.log("server started");
})


