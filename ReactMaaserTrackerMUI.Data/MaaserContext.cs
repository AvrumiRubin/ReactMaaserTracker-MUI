using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Income> Incomes { get; set; }
        public DbSet<IncomePayment> IncomePayments { get; set; }
        public DbSet<MaaserPayment> MaaserPayments { get; set; }
    }
}
