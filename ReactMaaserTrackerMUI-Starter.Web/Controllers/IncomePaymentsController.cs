using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomePaymentsController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomePaymentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addpayment")]
        public void AddPayment(IncomePayment incomePayment)
        {
            var repo = new IncomePaymentRepo(_connectionString);
            repo.Add(incomePayment);
        }

        [HttpGet]
        [Route("getall")]
        public List<IncomePayment> GetAll()
        {
            var repo = new IncomePaymentRepo(_connectionString);
            return repo.GetAll();
        }
    }
}
