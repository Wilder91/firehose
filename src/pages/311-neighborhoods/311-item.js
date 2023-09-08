import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function DataItem({ data, isNeighborhood }) {
  useEffect(() => {
    console.log(data['features'][1]['properties']);
  }, [data]);

  if (!data) {
    return null; // Return null if data is not defined
  }



  return (
    <div>
      <Card className="data-card">
        <Card.Body>
          'hello'
         
        </Card.Body>
      </Card>
    </div>
  );
}

export default DataItem;
