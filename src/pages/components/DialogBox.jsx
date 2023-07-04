import { Button, Modal } from 'react-bootstrap';
import React ,{useState}from 'react';

// import { EditableField } from './ediatable';
import { saveData } from '../../reducer/weatherData';
import { useDispatch } from 'react-redux';

const InfoDialogBox = ({ show, handleClose, data }) => {

    const dispatch = useDispatch();
    // const [editedData, setEditedData] = useState(data);
    
  if (!data) {
    return null; 
  }

  const handleSave = () => {
    dispatch(saveData(data));
    handleClose();
  };

//   const handleSaveField = (field, newValue) => {
//     setEditedData((prevData) => ({
//       ...prevData,
//       [field]: newValue,
//     }));
//   };

//  console.log(data)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Weather Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <EditableField label="Date" value={data.date} onSave={(newValue) => handleSaveField('date', newValue)} />
      <EditableField label="Max Temp" value={data.maxTemp} onSave={(newValue) => handleSaveField('maxTemp', newValue)} />
      <EditableField label="Min Temp" value={data.minTemp} onSave={(newValue) => handleSaveField('minTemp', newValue)} /> */}
     
        <p>Date: {data.date}</p>
        <p>Max Temp: {data.day.maxtemp_c}°C</p>
        <p>Min Temp: {data.day.mintemp_c}°C</p>
        <p>Humidity: {data.day.avghumidity}</p>
        <p>Perception: {data.day.totalprecip_mm}</p>
        <p>Rain: {data.day.daily_chance_of_rain}</p>
        <p>Condition: {data.day.condition.text}</p>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {data && (
          <>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
         </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InfoDialogBox;
