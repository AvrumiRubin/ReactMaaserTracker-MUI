using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class IncomeRepo
    {
        private readonly string _connectionString;

        public IncomeRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddIncome(string name)
        {
            using var context = new MaaserContext(_connectionString);
            context.Incomes.Add(new Income
            {
                Name = name
            });
            context.SaveChanges();
        }

        public List<Income> GetIncomes()
        {
            using var context = new MaaserContext(_connectionString);
            return context.Incomes.ToList();
        }

        public void Update(int id, string name)
        {
            using var context = new MaaserContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Update Incomes set name = {name} Where Id = {id}");
        }

        public void Delete(int id)
        {
            using var context = new MaaserContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete From Incomes Where Id = {id}");
        }


        //public List<Income> GetAll()
        //{
        //    using var context = new MaaserContext(_connectionString);
        //    return context.Incomes.Include(i => i.IncomePayments).ToList();
        //}
    }
}
