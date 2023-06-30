import React, {useState} from "react";
import {Form, Button} from 'react-bootstrap';

function FireCatcher() {
    const [neighborhood, setNeighborhood] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        fetchData();
    }
    
    function fetchData()  {
        fetch(`https://services1.arcgis.com/UWYHeuuJISiGmgXx/arcgis/rest/services/BuildingPermits/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson`, {
          method: 'GET',
          headers: new Headers( {
        
          })
        })
        .then(result =>(result.json()))
        .then(data =>setterFunction(data))
      }

      const setterFunction = (data) => {
        console.log(Object.values(data['features']))
        console.log(neighborhood.toUpperCase())
        console.log(data['features'].filter(item => {
            return item['properties']['Neighborhood'] === `${neighborhood.toUpperCase()}`;
          }));

      }
      


    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formProjectName'>
          <Form.Label>Neighborhood</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter neighborhood name'
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </Form.Group>
    
          
       
    
        <Button variant='primary' type='submit'>
          Search for Building Permits
        </Button>
    
       
      </Form>
        )
   

}

export default FireCatcher;