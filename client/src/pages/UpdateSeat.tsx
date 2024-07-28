import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from "react-toastify";
const schema = z.object({
  trainId: z.number().positive('Train ID must be a positive integer'),
  availableSeats: z.number().nonnegative('Available seats must be a non-negative integer'),
});

type FormData = z.infer<typeof schema>;

const UpdateSeat: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.patch(`http://localhost:8000/train/${data.trainId}`, {
        availableSeats: data.availableSeats,
      });
      console.log('response', response);
      toast.success('Seat updated successfully');
    } catch (error) {
      toast.error('Error updating seat');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Update Seat</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="trainId" className="block text-sm pb-2 font-medium text-gray-700">Train ID</label>
            <Input id="trainId" type="number" {...register('trainId', { valueAsNumber: true })} />
            {errors.trainId && <p className="text-red-500 text-sm mt-1">{errors.trainId.message}</p>}
          </div>
          <div>
            <label htmlFor="availableSeats" className="block pb-2  text-sm font-medium text-gray-700">Available Seats</label>
            <Input id="availableSeats" type="number" {...register('availableSeats', { valueAsNumber: true })} />
            {errors.availableSeats && <p className="text-red-500 text-sm mt-1">{errors.availableSeats.message}</p>}
          </div>
          <Button type="submit" className="w-full">Update Seat</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSeat;
