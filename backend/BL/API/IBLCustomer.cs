using Dal;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.API
{
    public interface IBLCustomer
    {
        public List<Appointment> GetAppointmentList(int id);
        public void Create(Customer item);

        public void Delete(Customer item);


        public List<Customer> Read();


        public void Update(Customer item);
        public Customer GetCustomerById(int id);
        public List<Appointment> GetCustomerAppList(int id);

    }
}
