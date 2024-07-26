import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("I'm Still Alive");
});

app.listen(PORT, (req, res) => {
  console.log("Server running");
});
