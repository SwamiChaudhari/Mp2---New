import React from "react";
import "./LikedItemsModal.css";
import { useSelector } from "react-redux";

const LikedItemsModal = ({ onClose }) => {
  const likedItems = useSelector((state) => state.liked); // Assuming liked items are stored in Redux

  return (
    <div className="liked-overlay">
      <div className="liked-container">
        <h3>❤️ Liked Items</h3>
        {likedItems.length > 0 ? (
          <ul>
            {likedItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No liked items yet.</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LikedItemsModal;
