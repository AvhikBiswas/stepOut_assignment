import express from "express";
import "dotenv/config";
import {
  bookSeatsController,
  createTrain,
  getTrainsByFromTo,
  Login_controller,
  register_controller,
} from "./src/controller/index.js";
import isUserAuth from "./src/middleware/authenticateToken.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import adminLogin from "./src/controller/adminLogin.js";
import isAdmin from "./src/middleware/isAdmin.js";

const app = express();
const SECRET = process.env.JWT_SECRET ;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // If you need to allow cookies with CORS
  })
);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("I'm Still Alive");
});

app.post("/register", register_controller);
app.post("/login", Login_controller);
app.post("/train",isAdmin, createTrain); 
app.get("/train",isUserAuth, getTrainsByFromTo);
app.post("/booking", isUserAuth, bookSeatsController);
app.post("/admin/login",adminLogin);

app.get("/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        res.status(200).json({
          success: true,
          user: decoded,
          error: {}
        });
      });
    } catch (error) {
      res.status(403).json({ error: "Forbidden", success: false });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
