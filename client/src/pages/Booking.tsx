import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../components/Avatar";
import SearchForm from "../components/SearchForm";
import TrainList from "../components/TrainList";

interface Train {
  id: number;
  name: string;
  departure: string;
  arrival: string;
  availableSeats: number;
}

interface User {
  id: string;
  name: string;
}

const Booking: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSearch = async (data: { from: string; to: string }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/train", {
        headers: { Authorization: `Bearer ${token}` },
        params: { from: data.from, to: data.to },
      });

      if (response.status === 200) {
        setTrains(response.data);
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">IRCTC</h1>
        {user && <Avatar name={user.name} />}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Search Trains</h2>
        <SearchForm onSubmit={handleSearch} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Available Trains</h2>
        {trains.length > 0 ? (
          <TrainList trains={trains} />
        ) : (
          <p>No trains available</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
