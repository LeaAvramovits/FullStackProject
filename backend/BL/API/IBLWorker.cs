using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.API
{
    public interface IBLWorker
    {

        public void Create(Worker item);

        public void Delete(Worker item);


        public List<Worker> Read();


        public void Update(Worker item);
        public Worker GetWorkerById(int id);
        public List<Appointment> GetWorkerAppList(int id);
    }
}