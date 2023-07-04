import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import React from 'react';
import Weather from './pages/weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Weather />} />
        <Route path="/saved" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;


// import Weather from './pages/weather';
// // import Weatherly from './pages/wetherly';

// function App() {
//   return (
//     <>
//    <Weather/>
//    {/* <Weatherly/> */}
//     </>
   
//   );
// }

// export default App;


