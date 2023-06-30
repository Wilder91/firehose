import React from "react";
import Card from 'react-bootstrap/Card'
function PermitInfo({ permit }) {
  const issuedDate = new Date(permit["properties"]["IssuedDate"]);
  const formattedDate = issuedDate.toLocaleDateString();
  const clipped_permit = permit['properties']
  return (
    <Card style={{ width: '80rem' }}>
    <div>
        
      {clipped_permit["Address"]} - {clipped_permit["Description"].charAt(0).toUpperCase() + clipped_permit["Description"].slice(1).toLowerCase()}
      <br />
      Date Issued: {formattedDate}
   
    <br />
    <br />
    
    </div>
    </Card>
  );
}

export default PermitInfo;
