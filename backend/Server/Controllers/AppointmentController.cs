using Dal;
using Dal.API;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Modeles;
using BL.API;
using BL;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        IBLAppointment appointment;
       
        public AppointmentController(IBL bl) 
        { 
        appointment=bl.blAppointment;
        }
        [HttpGet]
        public ActionResult<List<Appointment>> GetAppointments()
        {
            try {
                return appointment.Read();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "שגיאה בהוספת הלקוח.", error = ex.ToString() });
            }

        } 


       

        [HttpPost]
        public void CreateAppointment([FromBody] Appointment newAppointment)
        {
            appointment.Create(newAppointment);
        }

        //[HttpPut]
        //public void UpdateAppointment([FromBody] Appointment updatedAppointment,int id)
        //{
        //    appointment.Update(updatedAppointment,id);
        //}
        [HttpPut]
        public IActionResult UpdateAppointment([FromBody] Appointment updatedAppointment)
        {
            try
            {
                appointment.Update(updatedAppointment); // קריאה ל-BL בלבד!
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "שגיאה בעדכון התור.", error = ex.ToString() });
            }
        }
        [HttpDelete]
        public void DeleteAppointment([FromBody] Appointment deleteAppointment)
        {

            appointment.Delete(deleteAppointment);
        }


    }
}
