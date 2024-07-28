import { fetchTrainsByFromTo } from "../services/trainService.js";

export const getTrainsByFromTo = async (req, res) => {
    const { from, to } = req.query;
  console.log('from , to', from , to)
    if (!from || !to) {
      return res.status(400).json({ error: "Source and destination are required" });
    }
  
    try {
      const trains = await fetchTrainsByFromTo(from, to);
      res.status(200).json(trains);
    } catch (error) {
      console.error(`Error fetching trains from ${from} to ${to}:`, error);
      res.status(500).json({ error: "Failed to fetch trains by source and destination" });
    }
  }