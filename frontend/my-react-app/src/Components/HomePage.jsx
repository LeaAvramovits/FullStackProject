import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCurrentCustomer } from "../redux/customerSlice";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const HomePage = () => {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!id) return;

    try {
      // בדוק אם לקוח
      

     
      const customerResponse = await fetch(`http://localhost:5067/api/Customer/check/${id}`);
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        dispatch(setCurrentCustomer(customerData));
        navigate(`/personal-area/${id}`);
        return;
      }
       // בדוק אם עובד
      const workerResponse = await fetch(`http://localhost:5067/api/Worker/check/${id}`);
      if (workerResponse.ok) {
        const workerData = await workerResponse.json();
        navigate(`/worker-area/${workerData.id}`);
        return;
      }
      // לא נמצא
      navigate(`/contact`);
      setError('תעודת הזהות לא נמצאה. אנא נסה שוב או פנה לתמיכה.');
    } catch (err) {
      setError('שגיאת שרת');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>please enter your id number</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleLogin} style={styles.form}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="id number"
            variant="standard"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={styles.input}
            required
          />
        </Box>
        <button
          type="submit"
          disabled={!id}
          style={{
            ...styles.button,
            backgroundColor: id ? '#FF0000' : '#ccc',
            cursor: id ? 'pointer' : 'not-allowed',
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'inline-block',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontSize: '18px',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    marginTop: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default HomePage;