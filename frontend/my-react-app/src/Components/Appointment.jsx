import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Card, CardHeader, CardContent, Avatar, CardActions } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";

function getRandomImage() {
  // דוגמה לתמונה רנדומלית (Unsplash או randomuser)
  const imgs = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://randomuser.me/api/portraits/women/23.jpg',
  ];
  return imgs[Math.floor(Math.random() * imgs.length)];
}

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  const currentCustomer = useSelector(state => state.customer.currentCustomer);

  useEffect(() => {
    fetch('http://localhost:5067/api/Appointment')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5067/api/Worker')
      .then(res => res.json())
      .then(data => {
        // הוספת תמונה רנדומלית אם אין לכל עובד
        const withImages = data.map(worker => ({
          ...worker,
          imageUrl: worker.imageUrl || getRandomImage(),
        }));
        setWorkers(withImages);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter appointments by selected date
  const filteredAppointments = appointments.filter(appt => {
    const apptDate = dayjs(appt.appointmentsTime || appt.AppointmentsTime).startOf('day');
    const selected = selectedDate.startOf('day');
    return apptDate.isSame(selected, 'day');
  });

  // Unique worker IDs for the day
  const uniqueWorkerIds = [
    ...new Set(filteredAppointments.map(appt => appt.workerId))
  ];

  // Worker name
  const getWorkerName = (workerId) => {
    const worker = workers.find(w => String(w.id) === String(workerId));
    return worker ? `${worker.firstName} ${worker.lastName}` : `Worker #${workerId}`;
  };

  // Appointments for selected worker
  const appointmentsForWorker = filteredAppointments.filter(
    appt => appt.workerId === selectedWorkerId
  );

  const handleQueueClick = async (appointment) => {
    const customerId = currentCustomer?.id;
    if (!customerId) {
      alert('לא נמצא מזהה לקוח. יש להתחבר למערכת.');
      return;
    }
    try {
      const updatedAppointment = { ...appointment, customerId };
      const response = await fetch('http://localhost:5067/api/Appointment/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppointment),
      });
      if (response.ok) {
        alert('התור עודכן בהצלחה');
        // Update appointments after change
        const updatedAppointments = await fetch('http://localhost:5067/api/Appointment').then(res => res.json());
        setAppointments(updatedAppointments);
      } else {
        alert('שגיאה בעדכון התור');
      }
    } catch (err) {
      alert('שגיאת רשת');
    }
  };

  // רשימת העובדים שמוצגים (או עובד בודד, או כל העובדים)
  const shownWorkerIds = selectedWorkerId
    ? uniqueWorkerIds.filter(workerId => workerId === selectedWorkerId)
    : uniqueWorkerIds;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: 4, p: 2 }}>
        <DateCalendar
          value={selectedDate}
          onChange={date => {
            setSelectedDate(date);
            setSelectedWorkerId(null);
          }}
        />
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
          {selectedDate.format('DD/MM/YYYY')}
          </Typography>
          {uniqueWorkerIds.length === 0 && (
            <Typography>no available class</Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {shownWorkerIds.map(workerId => {
              const worker = workers.find(w => String(w.id) === String(workerId));
              if (!worker) return null;

              return (
                <Card key={workerId} sx={{ width: 240, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={worker.imageUrl}
                        alt={worker.firstName}
                        sx={{ width: 64, height: 64, margin: '0 auto' }}
                      >
                      </Avatar>
                    }
                    title={`${worker.firstName} ${worker.lastName}`}
                    subheader={worker.specialty}
                    sx={{ textAlign: 'center', width: '100%' }}
                  />
                  <CardContent sx={{ textAlign: 'center', width: '100%', p: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      phone number {worker.phoneNumber}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', width: '100%' }}>
                    {!selectedWorkerId && (
                      <Button
                        variant="contained"
                        onClick={() => setSelectedWorkerId(workerId)}
                        fullWidth
                      >
                        לקביעת תור 
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })}
            {/* כפתור חזרה להצגת כל העובדים */}
            {selectedWorkerId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setSelectedWorkerId(null)}
                sx={{ height: 55, alignSelf: 'center', minWidth: 90 }}
              >
                הצג את כל העובדים
              </Button>
            )}
          </Box>
          {selectedWorkerId && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
             available classes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {appointmentsForWorker.map(appt => {
                  const isTaken = appt.customerId !== null;
                  const startTime = dayjs(appt.appointmentsTime || appt.AppointmentsTime);
                  const endTime = startTime.add(appt.appointmentsDuration || appt.AppointmentsDuration, 'minute');
                  return (
                    <Button
                      key={appt.id}
                      variant={isTaken ? 'outlined' : 'contained'}
                      color={isTaken ? 'secondary' : 'primary'}
                      disabled={isTaken}
                      sx={{
                        minWidth: 0,
                        width: '110px',
                        padding: '8px 0',
                        textAlign: 'center'
                      }}
                      onClick={() => !isTaken && handleQueueClick(appt)}
                    >
                      {startTime.format('HH:mm')} - {endTime.format('HH:mm')}
                      {isTaken && <span style={{ marginRight: 4, color: 'red', fontWeight: 'bold' }}>❌</span>}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}

export default Appointments;