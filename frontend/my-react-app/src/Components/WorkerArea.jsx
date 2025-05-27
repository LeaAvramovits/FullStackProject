import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WorkerArea = () => {
  const { id } = useParams(); // מזהה העובד מה-URL
  console.log('worker id:', id)
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5067/api/Worker/AppList/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          setError('שגיאה בטעינת התורים');
        }
      } catch (err) {
        setError('שגיאה בשרת');
      }
    };

    fetchAppointments();
  }, [id]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>אזור אישי לעובד</h1>
      <h2>רשימת התורים שלך</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {appointments.length === 0 && !error && <p>אין תורים להצגה</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {appointments.map(appt => (
          <li key={appt.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <div>תור מס': {appt.id}</div>
            <div>לקוח: {appt.customerName}</div>
            <div>תאריך: {new Date(appt.date).toLocaleDateString()}</div>
            <div>שעה: {new Date(appt.date).toLocaleTimeString()}</div>
            {/* הוסיפי שדות נוספים לפי הצורך */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerArea;