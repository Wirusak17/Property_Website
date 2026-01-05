import { FaTrashAlt } from "react-icons/fa";
import "../style/favorits.css";

const FavMiniCard = ({ property, onToggleFav }) => {
  return (
    <div className="fav-mini-card">
      <div>
        <p className="fav-mini-location">{property.location}</p>
        <p className="fav-mini-price">
          £{property.price.toLocaleString()}
        </p>
      </div>

      <button
        className="fav-remove-btn"
        onClick={() => onToggleFav(property)}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default FavMiniCard;
