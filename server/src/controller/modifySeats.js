import { updateTrainSeats } from "../services/trainService.js";

export const modifyTrainSeats = async (req, res) => {
    const { id } = req.params;
    const { totalSeats } = req.body;
  
    if (!totalSeats) {
      return res.status(400).json({ error: "Total seats are required" });
    }
  
    try {
      const updatedTrain = await updateTrainSeats(parseInt(id, 10), { totalSeats });
      res.status(200).json(updatedTrain);
    } catch (error) {
      console.error(`Error updating seats for train with ID ${id}:`, error);
      res.status(500).json({ error: "Failed to update train seats" });
    }
  };