import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DashboardItem from "./dashboard-item";

function DashboardScraper() {
  const [neighborhood, setNeighborhood] = useState("");
  const [neighborhoodData, setNeighborhoodData] = useState([]);
  const [neighborhoodFound, setNeighborhoodFound] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
   
    setNeighborhood(neighborhood);
    fetchData();
  }

  function fetchData() {
    fetch(
      "https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/Neighborhood/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => setterFunction(data));
  }

  const setterFunction = (data) => {
    const sorted_data = data.features.sort((a, b) => {
      const nameA = a.properties.Name.toLowerCase();
      const nameB = b.properties.Name.toLowerCase();
  
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  
    console.log(sorted_data);
  
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
  
    const info = sorted_data.find(
      (item) => item.properties.Name === formattedNeighborhood
    );
  
    if (info) {
      console.log(info);
      setNeighborhoodData(info);
      setNeighborhoodFound(true);
    } else {
      setNeighborhoodFound(false);
    }
  };
  
  

  useEffect(() => {
    if (neighborhoodData.length !== 0) {
      console.log(neighborhoodData);
    }
  }, [neighborhoodData]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectName">
          <Form.Control
            required
            type="text"
            placeholder="Neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search for Demographic Information
        </Button>
      </Form>
      {neighborhoodFound ? (
        neighborhoodData.length !== 0 && (
          <DashboardItem neighborhoodData={neighborhoodData} />
        )
      ) : (
        <p>Neighborhood not found. Please try again and make sure you included any appropriate hyphens.</p>
      )}
    </div>
  );
}

export default DashboardScraper;