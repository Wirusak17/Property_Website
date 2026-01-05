import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "./properties.json";
import "../style/property.css";
import { FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const PropertyPage = () => {
  const { id } = useParams();

  const property = data.properties.find(
    (p) => String(p.id) === String(id)
  );

  if (!property) return <p>Page Not Found</p>;

  const [activeImg, setActiveImg] = useState(property.images[0]);

  return (
    <div className="property-page">

      {/* ===== HEADER ===== */}
        <div className="property-head">
            <h2 className="propertyPage-title">{property.location}</h2>

            <div className="property-head-meta">
                <p className="property-price">
                    £{property.price.toLocaleString()}
                    </p>
                <span className="property-type-badge">
                    {property.type}
                </span>
            </div>
        </div>

      {/* ===== MAIN SECTION ===== */}
        <div className="property-main">

            {/* LEFT : MAIN IMAGE */}
            <div className="property-left">
                <div className="gallery-main">
                    <img src={activeImg} alt="Property" />
                </div>
            </div>

            {/* RIGHT : DETAILS */}
            <div className="property-right">
                <h3>Gallery</h3>

                <div className="thumbnail-grid">
                    {property.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="thumb"
                            className={activeImg === img ? "active" : ""}
                            onClick={() => setActiveImg(img)}
                        />
                    ))}
                </div>

                <div className="short-description">
                    <h3 className="property-type" id="inner">
                        {property.type}
                    </h3>

                    <div className="card-specs">
                        <span>
                            <FaBed /> {property.bedrooms} Bedrooms
                        </span>
                        <span className="postcode-pill">
                            <FaMapMarkerAlt /> {property.postcode}
                        </span>
                    </div>

                    <h5>
                        Date Added: {property.added}
                    </h5>
                </div>

                <button className="contact-agent">
                    Contact Agent
                </button>
            </div>
        </div>

      {/* ===== TABS ===== */}
        <Tabs className="property-tabs">

            <TabList>
                <Tab>Description</Tab>
                <Tab>Floor Plan</Tab>
                <Tab>Map</Tab>
            </TabList>

            <TabPanel>
                <p className="property-description">
                    {property.description}
                </p>
            </TabPanel>

            <TabPanel>
                <div className="floorplan-tab">
                    <img
                        src={property.floorplan}
                        alt="Floor Plan"
                        className="floorplan-full"
                    />
                </div>
            </TabPanel>

            <TabPanel>
                <iframe
                src={property.url}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Property Location"
                />
            </TabPanel>

        </Tabs>
    </div>
  );
};

export default PropertyPage;
