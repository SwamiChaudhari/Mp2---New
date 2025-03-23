import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./Bidding.css"; // Import styles

const products = [
  { name: "Organic Mangoes", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
  { name: "Fresh Bananas", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { name: "Pure Honey", img: "https://5.imimg.com/data5/UD/MB/MY-42635865/natural-honey-1000x1000.jpg" }
];

const BiddingPage = () => {
  const [bids, setBids] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(products[0].name);
  const [bidAmount, setBidAmount] = useState("");

  // Listen for updates from the server
  useEffect(() => {
    socket.on("updateBids", (data) => {
      console.log("Received bid update:", data);
      setBids(data);
    });

    return () => {
      socket.off("updateBids"); // Cleanup
    };
  }, []);

  // Function to place a bid
  const placeBid = () => {
    if (!bidAmount) return;

    const currentBid = bids[selectedProduct] || 0;
    const newBid = currentBid + parseInt(bidAmount);

    // Optimistically update the UI before server response
    setBids((prevBids) => ({
      ...prevBids,
      [selectedProduct]: newBid,
    }));

    // Send bid to server
    socket.emit("placeBid", { product: selectedProduct, amount: newBid });

    setBidAmount("");
  };

  return (
    <div className="bidding-container">
      <h2 className="bidding-title">🔥 Live Bidding Section 🔥</h2>

      {/* Dropdown for Selecting Product */}
      <select
        className="bidding-dropdown"
        onChange={(e) => setSelectedProduct(e.target.value)}
        value={selectedProduct}
      >
        {products.map((product) => (
          <option key={product.name} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>

      {/* Input Field & Button */}
      <div className="bidding-input-section">
        <input
          type="number"
          className="bid-input"
          placeholder="Enter Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <button className="bid-button" onClick={placeBid}>
          Place Bid
        </button>
      </div>

      {/* Bidding Cards */}
      <div className="bidding-cards">
        {products.map((product) => (
          <div key={product.name} className="bidding-card">
            <img src={product.img} alt={product.name} className="bidding-image" />
            <h3>{product.name}</h3>
            <p>Highest Bid: ₹{bids[product.name] || "No Bids Yet"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiddingPage;
