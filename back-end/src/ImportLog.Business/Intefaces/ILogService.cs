using ImportLog.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImportLog.Business.Intefaces
{
    public interface ILogService : IDisposable
    {
        Task<Log> Get(Guid id);
        Task<List<Log>> Get();
        Task Add(Log log);
        Task Add(List<Log> logs);
        Task Update(Log log);
        Task Remove(Guid id);
    }
}