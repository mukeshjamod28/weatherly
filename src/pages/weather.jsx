import './weather.css';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const Weather = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [forecast, setForecast] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const cityRef = useRef('Paliyad');


  console.log("re-render", forecast);
  console.log("re-", );
 
  
  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityRef.current}&days=14`
      );
      const data = await response.json();
      setForecast(data.forecast);
      console.log('data', data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
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
        rain:day.day.daily_chance_of_rain
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
      <div className='container'>   
        <h1 className='text-center mt-2' >Weatherly Forecast</h1>
        <div className="dropdown d-flex justify-content-around">
        {formattedForecast.length > 0  && formattedForecast[0].sunset && (
          <h4 >Sunrise: {formattedForecast[0].sunrise}</h4>)}
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
          {formattedForecast.length > 0 && formattedForecast[0].sunrise  && (
           <h4 >Sunset: {formattedForecast[0].sunset}</h4>)}
        </div>


      {formattedForecast.length === 0 ? (
        <p>Loading...</p>
      ) : (
      <div className='d-flex  justify-content-center align-items-center'>
        <div>
      <h1 className='text-center mb-4 '>{cityRef.current.toLocaleUpperCase()}</h1> 
    <div className='table-responsive'>
      <table className='table table-bordered table-hover text-center transparent-table'>
          <thead> 
            <tr >
              <th>Date</th>
              <th>Max Temp (°C)</th>
              <th>Min Temp (°C)</th>
              <th>Humidity</th>
              <th>perception </th>
              <th>Rain</th>
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
                <td>{day.rain}</td>
                <td>{day.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
</div>

      )}
    </div>
    

  );
};

export default Weather;
