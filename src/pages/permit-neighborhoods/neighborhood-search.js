import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import NeighborhoodList from "./neighborhood-list";

function NeighborhoodSearch() {
  const [neighborhood, setNeighborhood] = useState("");
  const [permits, setPermits] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(true);
  const [filteredPermits, setFilteredPermits] = useState([]);
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      "https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/BuildingPermits/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => {
        setPermits(data.features);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    filterPermits();
    setSearched(true);
    setIsCleared(false);
  }

  function filterPermits() {
    const filteredPermits = permits.filter(
      (item) =>
        item.properties.Neighborhood === neighborhood.toUpperCase()
    );

    setSearchSuccessful(filteredPermits.length > 0);
    setFilteredPermits(filteredPermits);
  }

  function handleClear() {
    setNeighborhood("");
    setSearched(false);
    setSearchSuccessful(true);
    setIsCleared(true);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectName">
          <Form.Control
            required
            type="text"
            placeholder="Neighborhood Name"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search for Building Permits
        </Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear Search
        </Button>
      </Form>
      {searched && !searchSuccessful && (
        <div>No permits found for the entered neighborhood.</div>
      )}
      {searchSuccessful && filteredPermits.length > 0 && !isCleared && (
        <NeighborhoodList neighborhood={neighborhood} permits={filteredPermits} />
      )}
    </div>
  );
}

export default NeighborhoodSearch;