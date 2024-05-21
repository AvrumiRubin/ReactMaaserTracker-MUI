using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI_Starter.Web.Pages.ViewModels;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addincome")]
        public void AddIncome(IncomeViewModel vm)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.AddIncome(vm.Name);
        }

        [HttpGet]
        [Route("getincome")]
        public List<Income> GetIncomes()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetIncomes();
        }

        [HttpPost]
        [Route("update")]
        public void Update(UpdateViewModel vm)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.Update(vm.Id, vm.Name);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(DeleteViewModel vm )
        {
            var repo = new IncomeRepo(_connectionString);
            repo.Delete(vm.Id);
        }
    }
}
