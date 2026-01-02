import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BMICalculator from './pages/BMICalculator';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <div className="App">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<BMICalculator />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="*" element={<div style={{padding: '2rem', textAlign: 'center'}}>404: Страница не найдена</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;