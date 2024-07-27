// src/components/Avatar.tsx
import React from 'react';

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
