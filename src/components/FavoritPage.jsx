import React from "react";
import FavMiniCard from "./FavMiniCard";
import "../style/favorits.css";

const FavoritesPage = ({ favorites = [], onToggleFav }) => {
  return (
    <div className="favorites-container">

      <div className="favorites-header">
        <h3>My Shortlist ({favorites.length})</h3>
      </div>

      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <FavMiniCard
              key={item.id}
              property={item}
              onToggleFav={onToggleFav}
            />
          ))
        ) : (
          <p className="empty-message">
            No properties saved
          </p>
        )}
      </div>

    </div>
  );
};

export default FavoritesPage;
