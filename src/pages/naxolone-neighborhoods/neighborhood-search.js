import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import NeighborhoodList from "./neighborhood-list";

function NaxoloneNeighborhoodSearch() {
  const [zipCode, setZipCode] = useState("");
  const [issuances, setIssuances] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    fetchData();
  }

  function fetchData() {
    fetch(
      "https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/Baltimore_City_Fire_Department_Clinician_Administered_Naloxone_Proposed/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
      {
        method: "GET",
        headers: new Headers({}),
      }
    )
      .then((result) => result.json())
      .then((data) => setterFunction(data));
  }

  const setterFunction = (data) => {
    console.log(Object.values(data.features));
   
    const info = data.features.filter(
      (item) =>
        item.properties.Incident_Postal_Code === zipCode
    );

    console.log(info);
    setIssuances(info);
  };

  useEffect(() => {
    console.log(issuances);
  }, [issuances]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectName">
     
          <Form.Control
            required
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Search for Naxolone Administrations
        </Button>
      </Form>
      <NeighborhoodList zipCode={zipCode} issuances={issuances} />
    </div>
  );
}

export default NaxoloneNeighborhoodSearch;