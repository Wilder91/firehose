import React, { useEffect } from "react";
import PermitInfo from "../permit-info";

function NeighborhoodList({ neighborhood, permits }) {
    const sorted_permits = permits.sort((a, b) => {
        const dateA = new Date(a["properties"]["IssuedDate"]);
        const dateB = new Date(b["properties"]["IssuedDate"]);
      
        return dateB - dateA;
      });


  useEffect(() => {
 
    console.log(sorted_permits);
  }, []);
  
  return (
    <div>
    {neighborhood.neighborhood}
    <ul>
    {sorted_permits.map((permit, index) => {
      console.log(permit["properties"]["IssuedDate"]); // Log the permit object
   
      return (
        <div key={index}>
          <PermitInfo permit={permit} />
        </div>
      );
    })}
    </ul>
  </div>
  );
}

export default NeighborhoodList;