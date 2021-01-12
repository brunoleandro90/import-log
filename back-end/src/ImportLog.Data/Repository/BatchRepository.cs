using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Data.Context;

namespace ImportLog.Data.Repository
{
    public class BatchRepository : Repository<Batch>, IBatchRepository
    {
        public BatchRepository(ImportLogDbContext context) : base(context) { }
    }
}