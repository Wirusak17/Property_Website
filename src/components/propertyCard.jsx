import "../style/PropertyCard.css";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

const PropertyCard = ({ property, isFav, onToggleFav }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const goToDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const toggleFav = (e) => {
    e.stopPropagation();
    onToggleFav(property);
  };

  return (
    <div className="fav-card" onClick={goToDetails}>
      <div className="fav-card-img">
        <img src={property.images[0]} alt={property.location} />
        <span className="fav-tag">{property.tenure}</span>

        <button className="fav-heart-btn" onClick={toggleFav}>
          {isFav ? (
            <FaHeart className="heart-active" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>

      <div className="fav-card-body">
        <h3 className="fav-location">{property.location}</h3>
        <p className="fav-price">£{property.price.toLocaleString()}</p>
        <p className="fav-type">{property.type}</p>

        <div className="fav-meta">
          <span><FaBed /> {property.bedrooms}</span>
          <span><FaMapMarkerAlt /> {property.postcode}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
