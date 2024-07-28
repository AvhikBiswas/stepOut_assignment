import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import AdminHome from "./pages/AdminHome";
import ErrorPage from "./pages/ErrorPage";
import AddTrain from "./pages/AddTrain";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./utils/protectedRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/train"
          element={
            <ProtectedRoute>
              <AddTrain />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/seat"
          element={
            <ProtectedRoute>
              <ErrorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
