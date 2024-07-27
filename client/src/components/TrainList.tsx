// src/components/TrainList.tsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '../components/ui/button';

interface Train {
  id: number;
  name: string;
  departure: string;
  arrival: string;
}

interface TrainListProps {
  trains: Train[];
}

const TrainList: React.FC<TrainListProps> = ({ trains }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [seats, setSeats] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const openModal = (train: Train) => {
    setSelectedTrain(train);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTrain(null);
    setSeats(1);
    setBookingSuccess(false);
  };

  const handleBooking = () => {
    // Simulate a booking success/failure
    const isSuccess = Math.random() > 0.5;
    setBookingSuccess(isSuccess);
  };

  return (
    <div className="space-y-4">
      {trains.map(train => (
        <div key={train.id} className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-bold">{train.name}</h3>
          <p>Departure: {train.departure}</p>
          <p>Arrival: {train.arrival}</p>
          <Button onClick={() => openModal(train)} className="mt-2">Book Now</Button>
        </div>
      ))}

      <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          {selectedTrain && (
            <>
              <Dialog.Title className="text-xl font-bold">{`Booking for ${selectedTrain.name}`}</Dialog.Title>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  min="1"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={handleBooking}>Confirm Booking</Button>
                <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              </div>
              {bookingSuccess !== null && (
                <p className={`mt-4 ${bookingSuccess ? 'text-green-500' : 'text-red-500'}`}>
                  {bookingSuccess ? 'Booking Successful!' : 'Booking Failed!'}
                </p>
              )}
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default TrainList;
