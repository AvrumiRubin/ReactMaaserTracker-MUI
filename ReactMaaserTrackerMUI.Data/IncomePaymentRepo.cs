﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class IncomePaymentRepo
    {
        private readonly string _connectionString;

        public IncomePaymentRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(IncomePayment incomePayment)
        {
            using var context = new MaaserContext(_connectionString);
            context.IncomePayments.Add(incomePayment);
            context.SaveChanges();
        }

        public List<IncomePayment> GetAll()
        {
            using var context = new MaaserContext(_connectionString);
            return context.IncomePayments.Include(i => i.Income).ToList();
        }

        public decimal GetTotalIncome()
        {
            using var context = new MaaserContext(_connectionString);
            return context.IncomePayments.Sum(i => i.Amount);
        }
    }
}
