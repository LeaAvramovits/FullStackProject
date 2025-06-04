export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                if (Math.random() < 0.1) {
                    throw new Error("Simulated network error");
                }
                const response = await fetch('http://localhost:5067/api/Customer');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                resolve(result);
            } catch (error) {
                reject(error.message);
            }
        }, 1000);
    });
};
export const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5067/api/Customer/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, message }), // שליחת הנתונים כולל ההודעה
      });
  
      if (response.ok) {
        setSuccessMessage('!הלקוח נוסף בהצלחה');
        setErrorMessage('');
        setFormData({
          id: '',
          firstName: '',
          lastName: '',
          phone: '',
        });
        setMessage(''); // איפוס ההודעה
      } else {
        const errorData = await response.json();
        setSuccessMessage('');
        setErrorMessage(errorData.message || '.שגיאה בהוספת הלקוח');
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage('');
      setErrorMessage('.שגיאה בשרת');
    }
  };