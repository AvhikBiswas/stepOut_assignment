// src/components/SearchForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';

const schema = z.object({
  from: z.string().nonempty('From location is required'),
  to: z.string().nonempty('To location is required'),
});

type FormData = z.infer<typeof schema>;

interface SearchFormProps {
  onSubmit: (data: FormData) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="From" {...register('from')} className="w-full" />
        {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>}
      </div>
      <div>
        <Input placeholder="To" {...register('to')} className="w-full" />
        {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>}
      </div>
      <Button type="submit" className="w-full">Search Trains</Button>
    </form>
  );
};

export default SearchForm;
