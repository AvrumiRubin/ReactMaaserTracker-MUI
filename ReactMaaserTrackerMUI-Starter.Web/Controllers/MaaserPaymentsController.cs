using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI_Starter.Web.Pages.ViewModels;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserPaymentsController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserPaymentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("add")]
        public void Add(MaaserPayment maaserPayment)
        {
            var repo = new MaaserPaymentRepo(_connectionString);
            repo.Add(maaserPayment);
        }

        [HttpGet]
        [Route("getmaaser")]
        public List<MaaserPayment> GetMaaserPayments()
        {
            var repo = new MaaserPaymentRepo(_connectionString);
            return repo.GetMaaserPayments();
        }

        [HttpGet]
        [Route("overview")]
        public OverviewViewModel GetOverview()
        {
            var incomePaymentRepo = new IncomePaymentRepo(_connectionString);
            var maaserPaymentRepo = new MaaserPaymentRepo(_connectionString);

            var vm = new OverviewViewModel
            {
                TotalIncome = incomePaymentRepo.GetTotalIncome(),
                TotalMaaser = maaserPaymentRepo.GetTotal()
            };

            var amountRequiredToGive = vm.TotalIncome * .10m;
            vm.ObligatedAmount = amountRequiredToGive;
            vm.RemainingObligation = vm.ObligatedAmount - vm.TotalMaaser;
            return vm;

        }
    }
}
