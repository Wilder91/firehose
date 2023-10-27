import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ThreeOneOneList from "./311-list";

function Scraper311() {
  const [data, setData] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [dataFound, setDataFound] = useState(true);
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      "https://egis.baltimorecity.gov/egis/rest/services/GeoSpatialized_Tables/ServiceRequest_311/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => {
        setData(data);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchData();
    setSearchAttempted(true);
  }

  function searchData() {
    // Your search logic using 'data' goes here

    // Example logic: Checking if data exists and setting dataFound
    if (data) {
      setDataFound(true);
    } else {
      setDataFound(false);
    }
  }

  function handleClear() {
    // Clear logic goes here

    setSearchAttempted(false);
    setIsCleared(true);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

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
      {searchAttempted && (
        dataFound ? (
          data && !isCleared ? (
            <ThreeOneOneList data={data} />
          ) : null
        ) : (
          <p>
            Data not found. Please try again.
          </p>
        )
      )}
    </div>
  );
}

export default Scraper311;
