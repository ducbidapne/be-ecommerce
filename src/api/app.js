import express from "express";
import cors from "cors";
import connectDB from "./configs/database.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));

connectDB();
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Index !");
});

app.use((req, res) => {
  res.send("Not found!");
});

export default app;
