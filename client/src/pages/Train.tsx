import React, { useState } from "react";
import Avatar from "../components/Avatar";
import SearchForm from "../components/SearchForm";
import TrainList from "../components/TrainList";

// Define the type for the train data
interface Train {
  id: number;
  name: string;
  departure: string;
  arrival: string;
}

const Home: React.FC = () => {
  // Specify the type for the trains state
  const [trains, setTrains] = useState<Train[]>([]);

  const handleSearch = (data: { from: string; to: string }) => {
    // Mock train data
    const mockTrains: Train[] = [
      { id: 1, name: "Express 123", departure: "10:00 AM", arrival: "2:00 PM" },
      {
        id: 2,
        name: "Superfast 456",
        departure: "12:00 PM",
        arrival: "4:00 PM",
      },
    ];
    setTrains(mockTrains);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">IRCTC</h1>
        <Avatar name="Avhik" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Search Trains</h2>
        <SearchForm onSubmit={handleSearch} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Available Trains</h2>
        <TrainList trains={trains} />
      </div>
    </div>
  );
};

export default Home;
