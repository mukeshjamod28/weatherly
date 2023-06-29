import './weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const API_KEY = '48960783096f4d6fa05100531232806';

const Weather = () => {
  const [forecast, setForecast] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');

  const cityRef = useRef('Ahmedabad');

 
  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityRef.current}&days=14`
      );
      const data = await response.json();
      setForecast(data.forecast);
    } catch (error) {
      console.error('Error fetch in  forecast:', error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);


  const formattedForecast = useMemo(() => {
    if (forecast) {
      return forecast.forecastday.map(day => ({
        date: day.date,
        sunrise:day.astro.sunrise,
        sunset: day.astro.sunset,
        humidity:day.day.avghumidity,
        perception:day.day.totalprecip_mm,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
      }));
    }
    return [];
  }, [forecast]);
  const handleCountryChange = (country) => {
    cityRef.current = country;
    fetchForecast();
    setSelectedCountry(country);
  };

  return (
      <div className='container '>
   
        <h1 className='text-center mt-2' style={{color:"white"}}>Weatherly Forecast</h1>
        <div className="dropdown d-flex justify-content-center">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {selectedCountry}
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => handleCountryChange('London')}>London</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Paris')}>Paris</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('New York')}>New York</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Tokyo')}>Tokyo</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Ahmedabad')}>Ahmedabad</button></li>
          </ul>
          </div>

      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div>
      <h1 className='text-center mb-4 ' style={{color:'white'}}>{cityRef.current}</h1> 
    

      {formattedForecast.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className='table table-bordered table-responsive table-hover text-center  transparent-table'>
          <thead> 
            <tr  style={{color:"white"}}>
              <th>Date</th>
              <th>Max Temp (°C)</th>
              <th>Min Temp (°C)</th>
              <th>Humidity</th>
              <th>perception </th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {formattedForecast.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                <td>{day.maxTemp}°C</td>
                <td>{day.minTemp}°C</td>
                <td> {day.humidity}</td>
                <td>{day.perception}</td>
                <td>{day.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
     </div>

  );
};

export default Weather;
