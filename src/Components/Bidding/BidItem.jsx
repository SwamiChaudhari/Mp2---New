import React from "react";

const BidItem = ({ item, placeBid }) => {
  return (
    <div className="bid-item">
      <h3>{item.name}</h3>
      <p>Starting Price: ₹{item.startingPrice}</p>
      <p>Highest Bid: ₹{item.highestBid}</p>
      <button onClick={() => placeBid(item.id)}>Place Bid</button>
    </div>
  );
};

export default BidItem;
