import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import NeighborhoodList from "./permit-list";

function PermitSearch({neighborhood}) {
  
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
      "https://egisdata.baltimorecity.gov/egis/rest/services/Housing/DHCD_Open_Baltimore_Datasets/FeatureServer/3/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => {
        setPermits(data.features);
        return data; // Return the data for the next `then`
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or processing
        console.error("An error occurred:", error);
      });
  }

  async function upload(permits) {
    try {
      const response = await fetch("http://localhost:3000/permits", {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          permits: permits
        }),
      });
      const result = await response.json();
      console.log("Success:", result);
      console.log(permits)
    } catch (error) {
      console.error("Error:", error);
    }
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
    upload(permits)
  }

  function handleClear() {
    
    setSearched(false);
    setSearchSuccessful(true);
    setIsCleared(true);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
    

        <Button variant="primary" type="submit">
          Search
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

export default PermitSearch;