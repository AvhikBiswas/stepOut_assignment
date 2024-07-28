
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  trainName: z.string().nonempty("Train name is required"),
  sourceStation: z.string().nonempty("Source station is required"),
  destinationStation: z.string().nonempty("Destination station is required"),
  seatCapacity: z.number().positive("Seat capacity must be a positive integer"),
  arrivalTimeSource: z.string().nonempty("Departure time is required"),
  arrivalTimeDestination: z.string().nonempty("Arrival time is required"),
});

type FormData = z.infer<typeof schema>;

const AddTrain: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/train",
        {
          name: data.trainName,
          source: data.sourceStation,
          destination: data.destinationStation,
          totalSeats: data.seatCapacity,
          departure: data.arrivalTimeSource,
          arrival: data.arrivalTimeDestination,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Train added:", response.data);
      toast.success("Train added successfully");
    } catch (error) {
      toast.error("Error adding train");
      console.error("Error adding train:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add New Train</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="trainName"
              className="block pb-1 text-sm font-medium text-gray-700"
            >
              Train Name
            </label>
            <Input id="trainName" {...register("trainName")} />
            {errors.trainName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.trainName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="sourceStation"
              className="block pb-1 text-sm font-medium text-gray-700"
            >
              Source Station
            </label>
            <Input id="sourceStation" {...register("sourceStation")} />
            {errors.sourceStation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sourceStation.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="destinationStation"
              className="pb-1 block text-sm font-medium text-gray-700"
            >
              Destination Station
            </label>
            <Input id="destinationStation" {...register("destinationStation")} />
            {errors.destinationStation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.destinationStation.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="seatCapacity"
              className="block pb-1 text-sm font-medium text-gray-700"
            >
              Seat Capacity
            </label>
            <Input
              id="seatCapacity"
              type="number"
              {...register("seatCapacity", { valueAsNumber: true })}
            />
            {errors.seatCapacity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.seatCapacity.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="arrivalTimeSource"
              className="block pb-1 text-sm font-medium text-gray-700"
            >
              Departure Time
            </label>
            <Input
              id="arrivalTimeSource"
              type="time"
              {...register("arrivalTimeSource")}
            />
            {errors.arrivalTimeSource && (
              <p className="text-red-500 text-sm mt-1">
                {errors.arrivalTimeSource.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="arrivalTimeDestination"
              className="pb-1 block text-sm font-medium text-gray-700"
            >
              Arrival Time
            </label>
            <Input
              id="arrivalTimeDestination"
              type="time"
              {...register("arrivalTimeDestination")}
            />
            {errors.arrivalTimeDestination && (
              <p className="text-red-500 text-sm mt-1">
                {errors.arrivalTimeDestination.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Add Train
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTrain;
