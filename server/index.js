import express from "express";
import "dotenv/config";
import { createTrain, getTrainsByFromTo, Login_controller, modifyTrainSeats, register_controller } from "./src/controller";


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("I'm Still Alive");
});

app.get("/register", register_controller);
app.post("/login", Login_controller);
app.post("/train", createTrain);
app.get("train", getTrainsByFromTo);
app.patch("train", modifyTrainSeats);


app.listen(PORT, (req, res) => {
  console.log("Server running");
});
