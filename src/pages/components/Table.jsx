import React from "react";
const WeatherTable = ({forecastData,heading, onOpenDialog}) =>{
       
 return(
    <table className='table table-bordered table-hover text-center transparent-table'>
    <thead>
      <tr>
       {heading.map((label, index) => (
        <th key={index}>{label}</th>
       ))}
     </tr>
    </thead>     
      <tbody>
        {forecastData.map((day, index) => (
          <tr key={index}>
             <td>
              <button className="btn btn-primary" onClick= { ()=> onOpenDialog(day)}>View</button> 
            </td>
            <td>{day.date}</td>
            <td>{day.day.maxtemp_c}°C</td>
            <td>{day.day.mintemp_c}°C</td>
            <td>{day.day.avghumidity}</td>
            <td>{day.day.totalprecip_mm}</td>
            <td>{day.day.daily_chance_of_rain}</td>
            <td>{day.day.condition.text}</td>           
          </tr>
        ))}
      </tbody>
    </table>
    )
}


export default WeatherTable;