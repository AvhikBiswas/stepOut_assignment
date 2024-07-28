import { bookSeats } from "../services/bookingService.js";

export const bookSeatsController = async (req, res) => {
  const { trainId, requestedSeats } = req.body;
  const userId = req.user.id;
  console.log('req.user', req.user);

  if (!userId || !trainId || !requestedSeats) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: userId, trainId, or requestedSeats",
    });
  }

  if (requestedSeats <= 0) {
    return res.status(400).json({
      success: false,
      message: "Requested seats must be greater than zero",
    });
  }

  try {
    const booking = await bookSeats(userId, trainId, requestedSeats);

    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    // Handle errors
    console.error("Error in bookSeatsController:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while booking seats",
    });
  }
};
