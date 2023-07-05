import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { saveData } from '../../reducer/weatherData';
import { useDispatch } from 'react-redux';

const InfoDialogBox = ({ show, handleClose, data, path }) => {
  const dispatch = useDispatch();

  const [editedData, setEditedData] = useState({
    date: data?.date,
    day: {
      maxtemp_c: data?.day?.maxtemp_c,
      mintemp_c: data?.day?.mintemp_c,
      avghumidity: data?.day?.avghumidity,
      totalprecip_mm: data?.day?.totalprecip_mm,
      daily_chance_of_rain: data?.day?.daily_chance_of_rain,
      condition: {
        text: data?.day?.condition.text
      }
    }
  });

  useEffect(()=>{
    setEditedData(data)
  },[data])


const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'date') {
    setEditedData((prevData) => ({
      ...prevData,
      date: value
    }));
  } 
  else {
    setEditedData((prevData) => ({
      ...prevData,
      day: {
        ...prevData.day,
        [name]: value
      }
    }));
  }
};

  const handleSave = () => {
    dispatch(saveData(editedData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Weather Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {path === '/saved' ? (
          <>
            <div className="form-group">
              <label>Date:</label>
              <input className="form-control" type="text" name="date" value={editedData?.date} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Max Temp:</label>
              <input className="form-control" type="text" name="maxtemp_c" value={editedData?.day?.maxtemp_c} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Min Temp:</label>
              <input className="form-control" type="text" name="mintemp_c" value={editedData?.day?.mintemp_c} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Humidity:</label>
              <input className="form-control" type="text" name="avghumidity" value={editedData?.day?.avghumidity} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Precipitation:</label>
              <input className="form-control" type="text" name="totalprecip_mm" value={editedData?.day?.totalprecip_mm} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Rain:</label>
              <input className="form-control" type="text" name="daily_chance_of_rain" value={editedData?.day?.daily_chance_of_rain} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Condition:</label>
              <input className="form-control" type="text" name="condition.text" value={editedData?.day?.condition.text} onChange={handleInputChange} />
            </div>
          </>
        ) : (
          <div>
            <p>Date: {data?.date}</p>
            <p>Max Temp: {data?.day?.maxtemp_c}°C</p>
            <p>Min Temp: {data?.day?.mintemp_c}°C</p>
            <p>Humidity: {data?.day?.avghumidity}</p>
            <p>Precipitation: {data?.day?.totalprecip_mm}</p>
            <p>Rain: {data?.day?.daily_chance_of_rain}</p>
            <p>Condition: {data?.day?.condition.text}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {data && (
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InfoDialogBox;
