import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const PersonalArea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await fetch(`http://localhost:5067/api/Customer/check/${id}`);
        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          setCustomerDetails(customerData);
          setError('');
        } else {
          setCustomerDetails(null);
          setError('לא נמצאו פרטי לקוח');
        }
      } catch (err) {
        setError('שגיאה בשרת');
        setCustomerDetails(null);
      }
    };
    fetchData();
  }, [id]);

  const handleShowAppointments = async () => {
    setShowAppointments(true);
    setShowDetails(false);
    try {
      const response = await fetch(`http://localhost:5067/api/Customer/AppList/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
        setError('');
      } else {
        setError('שגיאה בטעינת התורים');
      }
    } catch (err) {
      setError('שגיאה בשרת');
    }
  };

  const handleShowDetails = () => {
    setShowDetails(true);
    setShowAppointments(false);
  };

  const handleBack = () => {
    setShowDetails(false);
    setShowAppointments(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>אזור אישי</Typography>
      {error && (
        <Paper elevation={2} sx={{ p: 2, mb: 2, background: '#ffeaea', color: '#d32f2f', maxWidth: 400, margin: '0 auto' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}

      {!error && !showDetails && !showAppointments && (
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant="contained"
            color="info"
            startIcon={<InfoIcon />}
            onClick={handleShowDetails}
            sx={{ minWidth: 180, fontSize: 18 }}
          >
            לצפייה בפרטים
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<EventIcon />}
            onClick={handleShowAppointments}
            sx={{ minWidth: 180, fontSize: 18 }}
          >
            לצפייה בתורים
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate('/appointments')}
            sx={{ minWidth: 180, fontSize: 18 }}
          >
            קביעת תור חדש
          </Button>
        </Stack>
      )}

      {/* הצגת פרטי לקוח */}
      {showDetails && customerDetails && (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom>פרטי לקוח</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>שם: {customerDetails.firstName} {customerDetails.lastName}</Typography>
          <Typography>תעודת זהות: {customerDetails.id}</Typography>
          <Typography>טלפון: {customerDetails.phone}</Typography>
          {/* אפשר להוסיף שדות נוספים כאן */}
          <Button
            variant="outlined"
            color="info"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
            onClick={handleBack}
          >
            חזור
          </Button>
        </Paper>
      )}

      {/* הצגת תורים */}
      {showAppointments && (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: '0 auto' }}>
          <Typography variant="h5" gutterBottom>התורים שלך</Typography>
          <Divider sx={{ mb: 2 }} />
          {appointments.length === 0 ? (
            <Typography color="text.secondary">אין תורים להצגה</Typography>
          ) : (
            <Stack spacing={2}>
              {appointments.map(appt => (
                <Paper key={appt.id} elevation={1} sx={{ p: 2, textAlign: 'right' }}>
                  <Typography>תאריך: {new Date(appt.date).toLocaleDateString()}</Typography>
                  <Typography>שעה: {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                  {/* אפשר להציג שדות נוספים כאן */}
                </Paper>
              ))}
            </Stack>
          )}
          <Button
            variant="outlined"
            color="success"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
            onClick={handleBack}
          >
            חזור
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default PersonalArea;