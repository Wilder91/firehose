import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function DashboardItem({ neighborhoodData }) {
  useEffect(() => {
    console.log(neighborhoodData);
  }, [neighborhoodData]);

  if (!neighborhoodData) {
    return null; // Return null if neighborhoodData is not defined
  }

  const { Name, Blk_AfAm, White, Population, Hisp_Lat, AmInd_AkNa, Asian, Housing, Occupied, Vacant } =
    neighborhoodData;

  const blackPercentage = ((Blk_AfAm / Population) * 100).toFixed(1);
  const whitePercentage = ((White / Population) * 100).toFixed(1);
  const latinoPercentage = ((Hisp_Lat / Population) * 100).toFixed(1);
  const nativePercentage = ((AmInd_AkNa / Population) * 100).toFixed(1);
  const asianPercentage = ((Asian / Population) * 100).toFixed(1);
  return (
    <div>
      <Card className="neighborhood-card">
        <Card.Body>
          {Name} has:
          <br />
          {Population} Residents
          <br />
          {Blk_AfAm} Black Residents ({blackPercentage}%)
          <br />
          {White} White Residents   ({whitePercentage}%)
          <br />
          {Hisp_Lat} Latino Residents   ({latinoPercentage}%)
          <br />
          {AmInd_AkNa} Native Residents ({nativePercentage}%)
          <br />
          {Asian} Asian Residents ({asianPercentage}%)
        </Card.Body>
      </Card>

      <Card className="neighborhood-card">
        {Housing} Homes
        <br />
        {Occupied} Occupied
        <br />
        {Vacant} Vacant
      </Card>
    </div>
  );
}

export default DashboardItem;
