import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => navigate('/admin/train')}>Add Train</Button>
          <Button className="w-full" onClick={() => navigate('/admin/seat')}>Update Seat</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
