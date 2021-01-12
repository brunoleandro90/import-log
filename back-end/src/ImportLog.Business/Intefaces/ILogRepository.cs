using ImportLog.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImportLog.Business.Intefaces
{
    public interface ILogRepository : IRepository<Log>
    {
        Task RemoveByBatchId(Guid batchId);
    }
}