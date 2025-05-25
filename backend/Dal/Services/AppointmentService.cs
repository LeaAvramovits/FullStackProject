using Dal.API;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class AppointmentService : IAppointment
    {
        DatabaseManager dbManager;
        public AppointmentService(DatabaseManager dbManager)
        {
            this.dbManager = dbManager;
        }

        public void Create(Appointment item)
        {
          
            dbManager.Appointments.Add(item);
            dbManager.SaveChanges();
        }

        public void Delete(Appointment item)
        {
       
            var appointmentToDelete = dbManager.Appointments.FirstOrDefault(a => a.Id == item.Id);
            if (appointmentToDelete == null)
            {
                Console.WriteLine("appointment not found");
                return;
            }
            dbManager.Appointments.Remove(item);
            dbManager.SaveChanges();
        }

        public List<Appointment> Read()
        {
            return dbManager.Appointments.ToList();
        }

        public void Update(Appointment updatedItem)
        {
            var existing = dbManager.Appointments.FirstOrDefault(a => a.Id == updatedItem.Id);
            if (existing != null)
            {
                existing.CustomerId = updatedItem.CustomerId;
                // אפשר לעדכן גם שדות נוספים אם צריך
                dbManager.SaveChanges();
            }
        }
        public List<Appointment> GetAppointmentsByCustomerId(int customerId)
        {
            return dbManager.Appointments.Where(a => a.CustomerId == customerId).ToList();
        }
    }
}
