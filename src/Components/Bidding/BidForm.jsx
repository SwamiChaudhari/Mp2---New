import React, { useState } from "react";

const BidForm = () => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log(`Bid Placed: ₹${bidAmount}`);
    setBidAmount("");
  };

  return (
    <form onSubmit={handleBidSubmit} className="bid-form">
      <input
        type="number"
        placeholder="Enter Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        required
      />
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
