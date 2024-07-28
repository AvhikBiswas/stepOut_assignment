import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define validation schema with zod
const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters').nonempty('Confirm Password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("User registered:", response.data);
      toast.success("Registration successful!");
      navigate("/"); 
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register('name')}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className="w-full"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className="w-full"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full">Register</Button>
        </form>
      </div>
    </div>
  );
}
