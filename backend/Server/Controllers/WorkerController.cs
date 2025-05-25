using BL.API;
using Dal;
using Dal.API;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        IBLWorker blworker;
        public WorkerController(IBL bl)
        {
            blworker = bl.blWorker;
        }
        [HttpGet]
        public ActionResult<List<Worker>> GetWorkers() => blworker.Read();

        [HttpPost]
        public void CreateWorker([FromBody] Worker newWorker)
        {
            blworker.Create(newWorker);
        }

        [HttpPut]
        public void UpdateWorker([FromBody] Worker updatedWorker)
        {
            blworker.Update(updatedWorker);
        }
        [HttpDelete]
        public void DeleteWorker([FromBody] Worker deleteWorker)
        {

            blworker.Delete(deleteWorker);
        }
        [HttpGet("check/{id}")]
        public IActionResult CheckWorkerById(int id)
        {
            var customer = blworker.GetWorkerById(id);
            if (customer == null)
            {
                return NotFound(new { message = "העובד אינו קיים במערכת" });
            }

            return Ok(customer);
        }
        [HttpGet("AppList/{id}")]
        public ActionResult<List<Appointment>> GetWorkerAppList(int id)
        {
           return blworker.GetWorkerAppList(id);
        }

    }
}
