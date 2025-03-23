import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace with actual API calls or mock data
    setProducts([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
    setOrders([
      { id: 101, name: "Order 1" },
      { id: 102, name: "Order 2" },
    ]);
  }, []);

  return (
    <div>
      <h1>Welcome to the Customer Dashboard</h1>
      <p>Here you can browse products, place orders, and track your purchases.</p>
      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
      </div>
      <Link to="/home">Go to Home</Link>
    </div>
  );
};

export default CustomerDashboard;
