import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card'

function VacantInfo({ vacant, neighborhood }) {
  const clipped_vacant = vacant['properties'];
  const dateNotice = new Date(clipped_vacant["DateNotice"]).toLocaleString();

  useEffect(() => {
    console.log(dateNotice);
  }, []);

  return (
    <Card style={{ width: '80rem' }}>
      <div>
        {clipped_vacant["Address"]}  
        <br />
        Date of Notice: {dateNotice}
        
        <br />
        <br />
      </div>
    </Card>
  );
}

export default VacantInfo;
