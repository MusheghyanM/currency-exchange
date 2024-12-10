import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyExchange from './CurrencyExchange';

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/currency-exchange" element={<CurrencyExchange />} />
          <Route path="/" element={<CurrencyExchange />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
