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
            IEnumerable<Log> logs = DbSet.AsNoTracking().Where(x => x.BatchId == batchId);
            
            foreach (Log entry in logs)
                Db.Entry(entry).State = EntityState.Detached;

            DbSet.RemoveRange(logs);
            await base.SaveChanges();
        }
    }
}