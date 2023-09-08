import React, { useEffect } from "react";
import ThreeOneOneItem from "./311-item";

function ThreeOneOneList({ neighborhood, permits }) {
  const sorted_permits = permits.sort((a, b) => {
    const dateA = new Date(a["properties"]["IssuedDate"]);
    const dateB = new Date(b["properties"]["IssuedDate"]);

    return dateB - dateA;
  });

  useEffect(() => {
    console.log(neighborhood);
  }, []);

  return (
    <div>
      {neighborhood.neighborhood}
      <ul>
        {sorted_permits.map((permit, index) => {
          console.log(permit["properties"]["Incident_Date"]); // Log the permit object

          return (
            <div key={index}>
              <ThreeOneOneItem permit={permit} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ThreeOneOneList;
