using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserPaymentRepo
    {
        private readonly string _connectionString;

        public MaaserPaymentRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(MaaserPayment maaserPayment)
        {
            using var context = new MaaserContext(_connectionString);
            context.MaaserPayments.Add(maaserPayment);
            context.SaveChanges();
        }

        public List<MaaserPayment> GetMaaserPayments()
        {
            using var context = new MaaserContext(_connectionString);
            return context.MaaserPayments.ToList();
        }

        public decimal GetTotal()
        {
            using var context = new MaaserContext(_connectionString);
            return context.MaaserPayments.Sum(i => i.Amount);
        }
    }
}
