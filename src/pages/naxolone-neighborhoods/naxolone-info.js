import React from "react";
import Card from 'react-bootstrap/Card'
function NaxoloneInfo({ permit }) {
 
 
  const clipped_naxolone = permit['properties']
  return (
    <Card style={{ width: '80rem' }}>
    <div>
        Naxolone was administered in this zip code on 
    
      {clipped_naxolone["Incident_Date"]}
      <br />
     
   
    <br />
    <br />
    
    </div>
    </Card>
  );
}

export default NaxoloneInfo;
