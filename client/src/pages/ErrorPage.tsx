import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Oops! You hit a dead end.</h2>
        <p className="mb-8">Sorry, the page you are looking for doesn't exist. But hey, look on the bright side – you've got a story to tell!</p>
        <div className="mb-8">
          <img src="https://media.giphy.com/media/3o7btP1t2sM5kKEg3q/giphy.gif" alt="Funny error gif" className="w-64 mx-auto rounded-lg shadow-lg" />
        </div>
        <Link to="/" className="text-blue-500 underline">Go back to safety</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
