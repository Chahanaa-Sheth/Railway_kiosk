import React, { useState } from 'react';
import './App.css';

const predefinedLocations = {
  "restaurant": { x: 500, y: 300 },
  "restroom": { x: 350, y: 220 },
  // Add more locations with coordinates
};

const startLocation = { x: 100, y: 100 }; // Starting location of the user on the map

function App() {
  const [pinLocation, setPinLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value.toLowerCase();

    if (predefinedLocations[location]) {
      setPinLocation(predefinedLocations[location]);
    } else {
      setPinLocation(null); // Clear the pin if location is not found
    }
  };

  // Zoom in and zoom out handlers
  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.2, 2)); // Max zoom level 2x
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.2, 0.5)); // Min zoom level 0.5x
  };

  // Generate arrows leading to the pin location
  const renderArrows = () => {
    if (!pinLocation) return null;

    const arrows = [];
    const steps = 4; // Number of arrows to generate

    // Calculate step differences between start and destination
    const xStep = (pinLocation.x - startLocation.x) / steps;
    const yStep = (pinLocation.y - startLocation.y) / steps;

    for (let i = 1; i <= steps-1; i++) {
      arrows.push(
        <div
          key={i}
          className="arrow"
          style={{
            left: `${startLocation.x + i * xStep}px`,
            top: `${startLocation.y + i * yStep}px`,
            transform: `scale(${zoomLevel})` // Adjust arrow size based on zoom level
          }}
        >
          ➡️
        </div>
      );
    }

    return arrows;
  };

  return (
    <div className="app-container">
      {/* Left Side - Static Map Display */}
      <div className="map-container">
        <div className="zoom-controls">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>

        <div className="map-wrapper" style={{ transform: `scale(${zoomLevel})` }}>
          <img src="/rail.jpg" alt="Chennai Railway Map" className="railway-map" />
          
          {/* Start Location */}
          <div
            className="start-location"
            style={{ left: `${startLocation.x}px`, top: `${startLocation.y}px` }}
          >
            🌟
          </div>

          {/* Arrows leading to the pin */}
          {renderArrows()}

          {/* Pin Location on the Map */}
          {pinLocation && (
            <div
              className="pin"
              style={{ left: `${pinLocation.x}px`, top: `${pinLocation.y}px` }}
            >
              📍
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Search Interface */}
      <div className="search-interface">
        <h2>Find Your Destination</h2>
        <form onSubmit={handleSearch}>
          <label htmlFor="location">Enter Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter a location (e.g., Restaurant)"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
