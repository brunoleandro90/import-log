using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Data.Context;

namespace ImportLog.Data.Repository
{
    public class LogRepository : Repository<Log>, ILogRepository
    {
        public LogRepository(ImportLogDbContext context) : base(context) { }
    }
}