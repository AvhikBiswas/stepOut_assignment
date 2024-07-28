import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import AdminHome from "./pages/AdminHome";
import UpdateSeat from "./pages/UpdateSeat";
import AddTrain from "./pages/AddTrain";
import AdminLogin from "./pages/AdminLogin";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/train" element={<AddTrain />} />
        <Route path="/admin/seat" element={<UpdateSeat />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
