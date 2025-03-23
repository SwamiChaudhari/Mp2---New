import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search-overlay">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchBar;
