using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Business.Models.Validations;

namespace ImportLog.Business.Services
{
    public class LogService : BaseService, ILogService
    {
        private readonly ILogRepository _logRepository;
        
        public LogService(ILogRepository logRepository,
                          INotifier notifier) : base(notifier)
        {
            _logRepository = logRepository;
        }

        public async Task<Log> Get(Guid id)
        {
            return await _logRepository.Get(id);
        }

        public async Task<List<Log>> Get()
        {
            return await _logRepository.Get();
        }

        public async Task Add(Log log)
        {
            if (!ExecuteValidation(new LogValidation(), log))
                return;

            await _logRepository.Add(log);
        }

        public async Task Add(List<Log> logs)
        {
            await _logRepository.Add(logs);
        }

        public async Task Update(Log log)
        {
            if (!ExecuteValidation(new LogValidation(), log))
                return;
            await _logRepository.DetachLocal(l => l.Id == log.Id);
            await _logRepository.Update(log);
        }

        public async Task Remove(Guid id)
        {
            await _logRepository.DetachLocal(l => l.Id == id);
            await _logRepository.Remove(id);
        }

        public void Dispose()
        {
            _logRepository?.Dispose();
        }
    }
}