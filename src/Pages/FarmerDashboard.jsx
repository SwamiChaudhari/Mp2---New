import React from "react";

const FarmerDashboard = () => {
  return (
    <>
      <div>
        <h1>Welcome to the Farmer Dashboard</h1>
        <p>Here you can manage your products, view orders, and more.</p>
      </div>
      <div className="farmer-actions">
        <button>Add Product</button>
        <button>Sale Product</button>
        <button>Create Bid</button>
      </div>
    </>
  );
};

export default FarmerDashboard;
