import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import VacantInfo from "./vacant-info";

function VacantScraper() {
  const [neighborhood, setNeighborhood] = useState("");
  const [vacants, setVacants] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchSuccessful, setSearchSuccessful] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      "https://egisdata.baltimorecity.gov/egis/rest/services/Housing/DHCD_Open_Baltimore_Datasets/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => setData(data));
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchVacants();
    setSearched(true);
  }

  function searchVacants() {
    if (neighborhood && data) {
      const formattedNeighborhood = neighborhood.trim().toUpperCase();

      const info = data.features.filter((item) => {
        const itemNeighborhood = item.properties.Neighborhood.trim();
        return itemNeighborhood === formattedNeighborhood;
      });

      setVacants(info);
      setSearchSuccessful(info.length > 0);
    }
  }

  useEffect(() => {
    console.log(vacants);
  }, [vacants]);

  function handleClearSearch() {
    setNeighborhood("");
    setVacants([]);
    setSearched(false);
    setSearchSuccessful(true);
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
          Search for Vacant Buildings
        </Button>
        <Button variant="secondary" onClick={handleClearSearch}>
          Clear Search
        </Button>
      </Form>
      {searched && !searchSuccessful && (
        <div>No vacants found for the entered neighborhood.</div>
      )}
      {searchSuccessful && searched && (
        <div>
          {neighborhood} has {vacants.length} Vacant Homes
          {vacants
            .sort((a, b) => {
              const streetA = a.properties.Address;
              const streetB = b.properties.Address;
              const firstLetterA = streetA.match(/[a-zA-Z]/)[0].toUpperCase();
              const firstLetterB = streetB.match(/[a-zA-Z]/)[0].toUpperCase();
              return firstLetterA.localeCompare(firstLetterB);
            })
            .map((vacant, index) => (
              <VacantInfo key={index} vacant={vacant} />
            ))}
        </div>
      )}
    </div>
  );
}

export default VacantScraper;
