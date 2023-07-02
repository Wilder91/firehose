import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DashboardItem from "./dashboard-item";

function DashboardScraper({ neighborhood }) {
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [neighborhoodFound, setNeighborhoodFound] = useState(true);
  const [isCleared, setIsCleared] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // Track the initial load
  const [searchAttempted, setSearchAttempted] = useState(false); // Track if a search has been attempted
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      "https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/Neighborhood/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => {
        setData(data);
        setInitialLoad(false); // Update the initial load state to false
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchNeighborhood();
    setSearchAttempted(true); // Set searchAttempted to true when a search is made
  }

  function searchNeighborhood() {
    if (neighborhood && data) {
      const formattedNeighborhood = formatNeighborhood(neighborhood);

      const info = data.features.find(
        (item) => item.properties.Name === formattedNeighborhood
      );

      if (info) {
        console.log(info);
        setNeighborhoodData(info.properties);
        setNeighborhoodFound(true);
      } else {
        setNeighborhoodFound(false);
      }
    }
  }

  function formatNeighborhood(neighborhood) {
    let formattedNeighborhood;
    if (neighborhood.includes("-")) {
      const words = neighborhood.toLowerCase().split("-");
      formattedNeighborhood = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-");
    } else {
      const words = neighborhood.toLowerCase().split(/\s+/);
      formattedNeighborhood = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return formattedNeighborhood;
  }

  function handleClear() {
    setNeighborhoodData(null);
    setNeighborhoodFound(true);
    setIsCleared(true);
    setSearchAttempted(false);
    setInitialLoad(true); // Reset initialLoad to true when clearing the search
  }

  useEffect(() => {
    if (neighborhoodData) {
      console.log(neighborhoodData);
    }
  }, [neighborhoodData]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">
          Search for Demographic Information
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear Search
        </Button>
      </Form>
      {searchAttempted && ( // Display the message only if a search has been attempted
        neighborhoodFound ? (
          neighborhoodData && !isCleared ? ( // Check if neighborhoodData is not null before rendering
            <DashboardItem neighborhoodData={neighborhoodData} />
          ) : null
        ) : (
          <p>
            Neighborhood not found. Please try again and make sure you included
            any appropriate hyphens.
          </p>
        )
      )}
    </div>
  );
}

export default DashboardScraper;
