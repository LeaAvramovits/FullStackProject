import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ContantPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    Adress: '', 
    phone: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCustomer = async (event) => {
    event.preventDefault();
    if (!formData.id) {
      alert('אנא הזן תעודת זהות ייחודית.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5067/api/Customer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('הלקוח נוסף בהצלחה!');
        setErrorMessage('');
        setFormData({
          id: '',
          firstName: '',
          lastName: '',
          age: '',
          Adress: '', 
          phone: '',
        });
      } else {
        const errorData = await response.json();
        setSuccessMessage('');
        setErrorMessage(errorData.message || 'שגיאה בהוספת הלקוח.');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('שגיאה בשרת.');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Log in
      </Typography>
      <Box
        component="form"
        onSubmit={handleAddCustomer}
        sx={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <TextField
          label="תעודת זהות"
          name="id"
          variant="outlined"
          value={formData.id}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="שם פרטי"
          name="firstName"
          variant="outlined"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="שם משפחה"
          name="lastName"
          variant="outlined"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="גיל"
          name="age"
          type="number"
          variant="outlined"
          value={formData.age}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="כתובת"
          name="Adress" 
          variant="outlined"
          value={formData.Adress} 
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="טלפון"
          name="phone"
          variant="outlined"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          הוסף למערכת
        </Button>
        {successMessage && (
          <Typography
            variant="body1"
            color="success"
            sx={{ marginTop: '20px' }}
          >
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginTop: '20px' }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ContantPage;