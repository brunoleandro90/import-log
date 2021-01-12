using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImportLog.Data.Repository
{
    public class LogRepository : Repository<Log>, ILogRepository
    {
        public LogRepository(ImportLogDbContext context) : base(context) { }

        public async Task RemoveByBatchId(Guid batchId)
        {
            Db.ChangeTracker.AutoDetectChangesEnabled = false;
            Db.ChangeTracker.LazyLoadingEnabled = false;
            IEnumerable<Log> logs = DbSet.Where(x => x.BatchId == batchId);
            DbSet.RemoveRange(logs);
            await base.SaveChanges();
        }
    }
}