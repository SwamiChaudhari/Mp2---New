import React, { useState } from "react";
import BidItem from "./BidItem";
import { sampleBiddingData } from "./biddingData.jsx";

const BiddingList = () => {
  const [biddingItems, setBiddingItems] = useState(sampleBiddingData);

  const placeBid = (id) => {
    const updatedItems = biddingItems.map(item => 
      item.id === id ? { ...item, highestBid: item.highestBid + 100 } : item
    );
    setBiddingItems(updatedItems);
  };

  return (
    <div className="bidding-list">
      {biddingItems.map(item => (
        <BidItem key={item.id} item={item} placeBid={placeBid} />
      ))}
    </div>
  );
};

export default BiddingList;
