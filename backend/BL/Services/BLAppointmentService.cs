using BL.API;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Modeles;
using Dal.API;
using Dal;

namespace BL.Services
{
    public class BLAppointmentService : IBLAppointment
    {
        IAppointment appointment;
        public BLAppointmentService(IDal dal)
        {
            appointment = dal.appointment;
        }
        public void Create(Appointment item)
        {
            if (item == null)
            {
                Console.WriteLine("appointment is empty");
                return;
            }
            appointment.Create(item);
        }

        public void Delete(Appointment item)
        {
            if (item == null)
            {
                Console.WriteLine("appointment is empty");
                return;
            }
           appointment.Delete(item);
        }

        public List<Appointment> Read()
        {
            return appointment.Read();
        }

        public void Update(Appointment item)
        {
            if (item == null)
            {
                Console.WriteLine("appointment is empty");
                return;
            }
         
            appointment.Update(item);
        }
      
    } 

    //public CustomerAppointment AddAppointment(string Specialty, Customer customer)
    //{
    //    List<Appointment> availableAppointment = new List<Appointment>();
    //    availableAppointment = appointment.Read();
    //    List<Appointment> newAppointment = availableAppointment.FindAll(a => a.WorkerId.Equals(Specialty));

    //}

}

