import prisma from "../client/prismaClient.js";

export const fetchTrains = async () => {
  try {
    return await prisma.train.findMany();
  } catch (error) {
    console.error("Error fetching trains:", error);
    throw new Error("Failed to fetch trains");
  }
};

// Fetch trains by source and destination
export const fetchTrainsByFromTo = async (from, to) => {
  try {
    return await prisma.train.findMany({
      where: {
        source: from,
        destination: to,
      },
    });
  } catch (error) {
    console.error(`Error fetching trains from ${from} to ${to}:`, error);
    throw new Error("Failed to fetch trains by source and destination");
  }
};

// Add a new train
export const addTrain = async ({
  name,
  source,
  destination,
  totalSeats,
  departure,
  arrival,
}) => {
  try {
    // Ensure that availableSeats is not more than totalSeats
    if (totalSeats <= 0) {
      throw new Error("Available seats cant be zero or lower");
    }
    console.log(
      name,
      source,
      destination,
      totalSeats,
      totalSeats,
      departure,
      arrival
    );
    return await prisma.train.create({
      data: {
        name,
        source,
        destination,
        totalSeats,
        availableSeats: totalSeats,
        departure,
        arrival,
      },
    });
  } catch (error) {
    console.error("Error adding new train:", error);
    throw new Error("Failed to add train");
  }
};

export const updateTrainSeats = async (id, { totalSeats }) => {
  try {
    // Ensure that availableSeats is not more than totalSeats
    if (totalSeats) {
      throw new Error("Available seats cannot exceed total seats");
    }

    return await prisma.train.update({
      where: { id },
      data: {
        totalSeats,
        availableSeats: totalSeats + availableSeats,
      },
    });
  } catch (error) {
    console.error(`Error updating seats for train with ID ${id}:`, error);
    throw new Error("Failed to update train seats");
  }
};
