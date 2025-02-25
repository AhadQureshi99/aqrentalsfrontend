import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Admin from "../pages/admin/admin";
import { Toaster } from "react-hot-toast";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import ShowCars from "../pages/admin/ShowCars";
import ShowContacts from "../pages/admin/showContacts";
import ShowBookings from "../pages/admin/showBookings";
import Fail from "../pages/Fail";

const Routers = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Define all other routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/show-cars" element={<ShowCars />} />
        <Route path="/admin/show-contacts" element={<ShowContacts />} />
        <Route path="/admin/show-bookings" element={<ShowBookings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routers;
