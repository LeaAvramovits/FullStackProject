using BL.API;
using Dal.models;
using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.API;
using Dal.API;

namespace BL.Services
{
    
    public class BLWorkerService:IBLWorker
    {
    IWorker worker;
      IAppointment appointment;
        public BLWorkerService(IDal dal) {
        worker=dal.worker;
        appointment = dal.appointment;
        }
    public void Create(Worker item)
    {
        if (item == null)
        {
            Console.WriteLine("worker is empty");
            return;
        }
        worker.Create(item);
    }

    public void Delete(Worker item)
    {
        if (item == null)
        {
            Console.WriteLine("worker is empty");
            return;
        }
        worker.Delete(item);
    }

    public List<Worker> Read()
    {
        return worker.Read();
    }

    public void Update(Worker item)
    {
        if (item == null)
        {
            Console.WriteLine("worker is empty");
            return;
        }
       worker.Update(item);
    }
        public Worker GetWorkerById(int id)
        {
            return worker.GetWorkerById(id);
        }

        public List<Appointment> GetWorkerAppList(int id)
        {
            return appointment.Read().FindAll(a => a.WorkerId == id).ToList().FindAll(a=>a.CustomerId!=null); 
        }
    }
}
