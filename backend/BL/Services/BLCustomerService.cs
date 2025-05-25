using Dal.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Modeles;
using Dal.models;
using BL.API;
using Dal;
using Microsoft.EntityFrameworkCore;


namespace BL.Services
{
    public class BLCustomerService : IBLCustomer
    {
        
        IBLAppointment appointment;
        ICustomer customer;
        public BLCustomerService(IDal dal , IBLAppointment bLAppointment)
        {
            customer = dal.customer;
            appointment = bLAppointment;
        }

        public List<Appointment> GetAppointmentList(int id) { 
        
            List<Appointment> appointments = new List<Appointment>();
            appointments = appointment.Read().FindAll(a=>a.CustomerId==id).ToList();
            return appointments;


        }
        public void Create(Customer item)
        {
            if (item == null)
            {
                Console.WriteLine("customer is empty");
                return;
            }
            customer.Create(item);
           
        }

        public void Delete(Customer item)
        {
            if (item == null)
            {
                Console.WriteLine("Customer is empty.");
                return;
            }

            customer.Delete(item);

        }

        public List<Customer> Read()
        {
            return customer.Read();
        }

        public void Update(Customer item)
        {
            if (item == null)
            {
                Console.WriteLine("Invalid customer data.");
            }

            
           customer.Update(item);
        }

        public Customer GetCustomerById(int id)
        {
            return customer.GetCustomerById(id);
        }
        public List<Appointment> GetCustomerAppList(int id)
        {
            return appointment.Read().FindAll(a => a.CustomerId == id).ToList();
        }
    }


}

