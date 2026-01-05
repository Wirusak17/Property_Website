import React, { useState } from "react";
import { DropdownList, NumberPicker } from "react-widgets";
import "react-widgets/styles.css";
import "../style/HorizontalSearchBar.css";
import data from "./properties.json";
import PropertyCard from "./propertyCard";
import FavoritesPage from "./FavoritPage";

const HorizontalSearchBar = () => {
    const [propertyType, setPropertyType] = useState("Any");
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [minBeds, setMinBeds] = useState();
    const [maxBeds, setMaxBeds] = useState();
    const [postcode, setPostcode] = useState("");

    const [results, setResults] = useState([]);

    const [favourites, setFavourites] = useState([]);

    const handleSearch = () => {
        const filtered = data.properties.filter((prop) => {
        const typeMatch =
            propertyType === "Any" || prop.type === propertyType;

        const priceMatch =
            (minPrice==null || prop.price >= minPrice) &&
            (maxPrice==null || prop.price <= maxPrice);

        const bedMatch =
            (minBeds==null || prop.bedrooms >= minBeds) &&
            (maxBeds==null || prop.bedrooms <= maxBeds);

        const postcodeMatch =
            !postcode ||
            prop.postcode.toUpperCase().startsWith(postcode.toUpperCase());

        return typeMatch && priceMatch && bedMatch && postcodeMatch;
        });

        setResults(filtered);
    };

    const toggleFavourite = (property) => {
        setFavourites((prevFavs) => {
        const exists = prevFavs.some((p) => p.id === property.id);

        if (exists) {
        // remove from favourites
            return prevFavs.filter((p) => p.id !== property.id);
        } else {
        // add to favourites
            return [...prevFavs, property];
        }
        });
    };

    return (
        <>
        {/* FILTER BAR */}
        <div className="filter-bar">
            <div className="filter-item">
                <DropdownList
                    data={["Any", "House", "Flat"]}
                    value={propertyType}
                    onChange={setPropertyType}
                />
            </div>

            <div className="filter-item">
                <NumberPicker
                    placeholder="Min £"
                    min={50000}
                    step={50000}
                    value={minPrice}
                    onChange={setMinPrice}
                />
            </div>

            <div className="filter-item">
                <NumberPicker
                    placeholder="Max £"
                    min={minPrice || 50000}
                    step={50000}
                    value={maxPrice}
                    onChange={setMaxPrice}
                />
            </div>

            <div className="filter-item">
                <NumberPicker
                    placeholder="Min Beds"
                    min={1}
                    max={10}
                    step={1}
                    value={minBeds}
                    onChange={setMinBeds}
                />
            </div>

            <div className="filter-item">
                <NumberPicker
                    placeholder="Max Beds"
                    min={minBeds || 1}
                    max={10}
                    step={1}
                    value={maxBeds}
                    onChange={setMaxBeds}
                />
            </div>

            <div className="filter-item">
                <input
                    type="text"
                    className="postcode-input"
                    placeholder="Postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </div>

            <button className="filter-btn" onClick={handleSearch}>
            Search
            </button>
        </div>

        <div className="page-layout">
  
            {/*  SEARCH RESULTS */}
            <div className="results-section">
                {results.length === 0 ? (
                <p className="no-results">No properties found</p>
                ) : (
                results.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        isFav={favourites.some((p) => p.id === property.id)}
                        onToggleFav={toggleFavourite}
                    />
                ))
                )}
            </div>

            {/*FAVORITES */}
            <FavoritesPage
                favorites={favourites}
                onToggleFav={toggleFavourite}
            />

        </div>

    </>
  );
};

export default HorizontalSearchBar;
