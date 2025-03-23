import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Shop from "../src/Pages/Shop";
import Contact from "../src/Pages/Contact";
import Blog from "../src/Pages/Blog";
import Header from "../src/Components/Header/Navbar";
import Footer from "../src/Components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import TermsConditions from "./Pages/TermsConditions";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import { Toaster } from "react-hot-toast";
import FarmerDashboard from "./Pages/FarmerDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";
import RetailerDashboard from "./Pages/RetailerDashboard";

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem("userRole"); // Retrieve role from localStorage
  if (userRole !== role) {
    return <Navigate to="/loginSignUp" />;
  }
  return children;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/farmer-dashboard"
            element={
              <ProtectedRoute role="Farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute role="Customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/retailer-dashboard"
            element={
              <ProtectedRoute role="Retailer">
                <RetailerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
