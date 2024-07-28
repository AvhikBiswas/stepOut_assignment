import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { Train } from "../types/Train";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface TrainListProps {
  trains: Train[];
}

const TrainList: React.FC<TrainListProps> = ({ trains }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [seats, setSeats] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState<null | boolean>(null);

  const openModal = (train: Train) => {
    setSelectedTrain(train);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTrain(null);
    setSeats(1);
    setBookingSuccess(null);
  };

  const handleBooking = async () => {
    if (!selectedTrain) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to book a train.");
      setBookingSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/booking",
        {
          trainId: selectedTrain.id,
          requestedSeats: seats,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setBookingSuccess(true);
        toast.success("Booking Successful!");
        closeModal();
      } else {
        setBookingSuccess(false);
        toast.error("Booking Failed!");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setBookingSuccess(false);
      toast.error("An error occurred during booking.");
    }
  };

  return (
    <div className="flex flex-wrap justify-stretch space-x-2">
      <ToastContainer />
      {trains.length > 0 ? (
        trains.map((train) => (
          <div key={train.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{train.name}</h3>
            <p>Departure: {train.departure}</p>
            <p>Arrival: {train.arrival}</p>
            <p>Seats: {train.availableSeats}</p>
            <Button onClick={() => openModal(train)} className="mt-2 hover:-translate-y-[3px] ease-in-out">
              Book Now
            </Button>
          </div>
        ))
      ) : (
        <p>No trains available</p>
      )}

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          {selectedTrain && (
            <>
              <Dialog.Title className="text-xl font-bold">{`Booking for ${selectedTrain.name}`}</Dialog.Title>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Seats
                </label>
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
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              {bookingSuccess !== null && (
                <p
                  className={`mt-4 ${
                    bookingSuccess ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {bookingSuccess ? "Booking Successful!" : "Booking Failed!"}
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
