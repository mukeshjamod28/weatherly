import './weather.css';

import React, { useEffect, useRef, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import InfoDialogBox from './components/DialogBox';
import WeatherTable from './components/Table';
import { useSelector } from 'react-redux';

const Weather = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [forecast, setForecast] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const cityRef = useRef('Paliyad');
  const location = useLocation();
  const navigate = useNavigate();
  const weatherInfo = useSelector((state)=>state.data.weather);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenDialog = (forecast) => {
    if (location.pathname === '/saved'){
      
      setSelectedData(forecast.data);
    }
    else{
      setSelectedData(forecast)
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  console.log("re-render", forecast);
  console.log("re" , selectedData); 
  
  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityRef.current}&days=14`
      );
      const data = await response.json();
      setForecast(data.forecast.forecastday);
      console.log('data', data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  useEffect(() => {
    if (location.pathname === '/saved') {
      if (weatherInfo) {     
        setForecast(weatherInfo);
      } else {    
        fetchForecast();
      }
    } else {
      fetchForecast();
    }
  }, [ location.pathname, weatherInfo]);

  const handleCountryChange = (country) => {
    cityRef.current = country;
    fetchForecast();
    setSelectedCountry(country);
  };

  const head = [ "",
  "Date",
  "Max Temp (°C)",
  "Min Temp (°C)",
  "Humidity",
  "Perception",
  "Rain",
  "Condition"        
];

const getDataTable = () =>{
  navigate('/saved');
};

  return (
      <div className='container'>   
        <h1 className='text-center mt-2' >Weatherly Forecast</h1>
        <Button onClick={getDataTable}>Saved</Button>
        <div className="dropdown d-flex justify-content-around">
        {/* {formattedForecast.length > 0  && formattedForecast[0].sunset && (
          <h4 >Sunrise: {formattedForecast[0].sunrise}</h4>)} */}
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" disabled={location.pathname === '/saved'}>
            {selectedCountry}
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => handleCountryChange('London')}>London</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Paris')}>Paris</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('New York')}>New York</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Tokyo')}>Tokyo</button></li>
            <li><button className="dropdown-item" onClick={() => handleCountryChange('Ahmedabad')}>Ahmedabad</button></li>
          </ul>
          {/* {formattedForecast.length > 0 && formattedForecast[0].sunrise  && (
           <h4 >Sunset: {formattedForecast[0].sunset}</h4>)} */}
        </div>


      {forecast === null ? (
        <p>Loading...</p>
      )  :(
      <div className='d-flex  justify-content-center align-items-center'>
        <div>
      <h1 className='text-center mb-4 '>{cityRef.current.toLocaleUpperCase()}</h1> 
      <div className='table-responsive'>
          <WeatherTable forecastData={forecast} onOpenDialog={handleOpenDialog} heading={head} />        
      </div>
        </div>
    </div>
      )}
    <InfoDialogBox show={showDialog} handleClose={handleCloseDialog} data={selectedData} path={window.location.pathname} />
    </div>
  );
};

export default Weather;
