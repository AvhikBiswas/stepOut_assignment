import { addTrain } from "../services/trainService.js";

export const createTrain = async (req, res) => {
    const { name, source, destination, totalSeats,departure,arrival } = req.body;
  
    if (!name || !source || !destination || !arrival || !departure || totalSeats == null  ) {
      return res.status(400).json({ error: "Name, source, destination, and total seats are required" });
    }
  
    try {
      const newTrain = await addTrain({ name, source, destination, totalSeats ,departure,arrival});
      res.status(201).json(newTrain);
    } catch (error) {
      console.error("Error adding new train:", error);
      res.status(500).json({ error: "Failed to add train" });
    }
  };
  