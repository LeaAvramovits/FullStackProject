using BL.Modeles;
using Dal.API;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//

namespace BL.API
{
    public interface IBLAppointment
    {
        public void Create(Appointment item);

        public void Delete(Appointment item);


        public List<Appointment> Read();


        public void Update(Appointment item);
        
    }
}
