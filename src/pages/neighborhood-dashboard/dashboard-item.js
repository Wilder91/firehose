import React, {useEffect} from 'react'
import Card from 'react-bootstrap/Card'
function DashboardItem({neighborhoodData}) {
    const Neighborhood = neighborhoodData['properties']
    const Name = Neighborhood['Name']
    const Black = Neighborhood['Blk_AfAm']
    const White = Neighborhood['White']
    const Population = Neighborhood['Population']
    const Latino = Neighborhood['Hisp_Lat']
    const Native = Neighborhood['AmInd_AkNa']
    const Asian = Neighborhood['Asian']
    const Housing = Neighborhood['Housing']
    const Occupied = Neighborhood['Occupied']
    const Vacant = Neighborhood['Vacant']
   
    useEffect(() => {
        console.log(neighborhoodData['properties']);
      }, []);
    return(
        <div>
            <Card className='neighborhood-card'>
        {Name} has:
        <br /> 
        {Population} Residents
        <br />
        {Black} Black Residents
        <br />
        {White} White Residents
        <br />
        {Latino} Latino Residents
        <br /> 
        {Native} Native Residents 
        <br /> 
        {Asian} Asian Residents
        </Card>
        
        <Card className='neighborhood-card'>
            {Housing} Homes 
            <br />
            {Occupied} Occupied 
            <br />
            {Vacant} Vacant
        </Card>
        </div>
        
    )
}

export default DashboardItem