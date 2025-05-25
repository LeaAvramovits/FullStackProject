using BL.API;
using Dal.API;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        DatabaseManager dbManager;
        ICustomer customer;
        IBLCustomer blCustomer;

        public CustomerController(IBL bL)
        {
            //customer = dal.customer;
            blCustomer = bL.blCustomer;
        }
        [HttpGet]
        public ActionResult<List<Customer>> GetCustomers() => blCustomer.Read();

        //[HttpPost]
        //public void CreateCustomer([FromBody] Customer newCustomer)
        //{
        //    blCustomer.Create(newCustomer);
        //}


        [HttpPost("add")]
        //[Route("api/Customer")]
        public IActionResult CreateCustomer([FromBody] Customer newCustomer)
        {
            try
            {
                // קריאה ללוגיקה העסקית להוספת לקוח
              
                blCustomer.Create(newCustomer);
                return Ok(new { message = "הלקוח נוסף בהצלחה!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "שגיאה בהוספת הלקוח.", error = ex.Message });
            }
        }

        [HttpPut]
        public void UpdateCustomer([FromBody] Customer updatedCustomer)
        {
            blCustomer.Update(updatedCustomer);
        }
        [HttpDelete]
        public void DeleteCustomer([FromBody] Customer deleteCustomer)
        {

            blCustomer.Delete(deleteCustomer);
        }
        [HttpGet("{id}")]
        public ActionResult<List<Appointment>> GetCustomerAppointmentsById(int id)
        {
            return blCustomer.GetAppointmentList(id);
        }
        [HttpGet("check/{id}")]
        public IActionResult CheckCustomerById(int id)
        {
            var customer = blCustomer.GetCustomerById(id);
            if (customer == null)
            {
                return NotFound(new { message = "הלקוח אינו קיים במערכת" });
            }

            return Ok(customer);
        }
        [HttpGet("AppList/{id}")]
        public ActionResult<List<Appointment>> GetCustomerAppList(int id)
        {
            return blCustomer.GetCustomerAppList(id);
        }
    }
}
