import React, { useEffect } from "react";
import NaxoloneInfo from "./naxolone-info";

function NeighborhoodList({ zipCode, issuances }) {
  useEffect(() => {
    const sorted_permits = [...issuances].sort((a, b) => {
      const dateA = a["properties"]["Incident_Date"];
      const dateB = b["properties"]["Incident_Date"];

      return dateB - dateA;
    });

    console.log(sorted_permits);
  }, [issuances]);

  return (
    <div>
      <ul>
        {issuances.map((permit, index) => {
          console.log(permit["properties"]["Incident_Date"]); // Log the permit object

          return (
            <div key={index}>
              <NaxoloneInfo permit={permit} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default NeighborhoodList;