using ImportLog.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImportLog.Business.Intefaces
{
    public interface IBatchService : IDisposable
    {
        Task<Batch> Get(Guid id);
        Task<List<Batch>> Get();
        Task Add(Batch batch);
        Task Update(Batch batch);
        Task Remove(Guid id);
    }
}