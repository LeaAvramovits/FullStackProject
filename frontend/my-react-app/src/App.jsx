import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './App.css';
import Customer from './Components/Customer';
import NavBar from './Components/NavBar';
import PersonalArea from './Components/PersonalArea';
import Branches from './Components/Branches';
import HomePage from './Components/HomePage';
import ContactPage from './Components/ContactPage';
import Appointments from './Components/Appointment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkerArea from './Components/WorkerArea';

// קומפוננטה עבור כפתור "חזור"
function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
  variant="contained"
  color="primary"
  onClick={() => navigate(-1)}
  sx={{
    position: 'fixed',
    top: 16,
    right: 16,
    zIndex: 1200,
    backgroundColor: '#fff',
    color: '#1976d2',
    border: '1px solid #1976d2',
    '&:hover': {
      backgroundColor: '#e3e3e3'
    }
  }}
  startIcon={<ArrowBackIcon />}
>
  חזור
</Button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <BackButton />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal-area/:id" element={<PersonalArea />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/worker-area/:id" element={<WorkerArea />} />
      </Routes>
    </Router>
  );
}

export default App;