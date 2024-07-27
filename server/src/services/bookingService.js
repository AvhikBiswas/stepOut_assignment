// services/bookingService.js
import prisma from '../client/prismaClient.js';

export const bookSeats = async (userId, trainId, requestedSeats) => {
  return await prisma.$transaction(async (prisma) => {
    
    const train = await prisma.train.findUnique({
      where: { id: trainId },
    });

    if (!train) {
      throw new Error('Train not found');
    }

    const newAvailableSeats = train.availableSeats - requestedSeats;

    if (newAvailableSeats < 0) {
      throw new Error('Not enough available seats');
    }


    const seatNo = Math.floor(Math.random() * 100); 

    const booking = await prisma.booking.create({
      data: {
        userId,
        trainId,
        seatNo, 
      },
    });

    // Update train seats
    await prisma.train.update({
      where: { id: trainId },
      data: { availableSeats: newAvailableSeats },
    });

    return booking;
  });
};
