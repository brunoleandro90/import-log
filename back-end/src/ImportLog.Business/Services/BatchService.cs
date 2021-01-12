using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Business.Models.Validations;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ImportLog.Business.Services
{
    public class BatchService : BaseService, IBatchService
    {
        private readonly IBatchRepository _batchRepository;
        private readonly ILogService _logService;

        public BatchService(IBatchRepository batchRepository,
                            ILogService logService,
                            INotifier notifier) : base(notifier)
        {
            _batchRepository = batchRepository;
            _logService = logService;
        }

        public async Task<Batch> Get(Guid id)
        {
            return await _batchRepository.Get(id);
        }

        public async Task<List<Batch>> Get()
        {
            return await _batchRepository.Get();
        }

        public async Task Add(Batch batch)
        {
            if (!ExecuteValidation(new BatchValidation(), batch))
                return;

            if (batch.FileAsBase64.Contains(","))
            {
                batch.FileAsBase64 = batch.FileAsBase64.Substring(batch.FileAsBase64.IndexOf(",") + 1);
            }
            byte[] fileAsByteArray = Convert.FromBase64String(batch.FileAsBase64);
            batch.FileAsBase64 = null;
            await _batchRepository.Add(batch);

            batch.NumberLogs = await ReadFileAsBase64(fileAsByteArray, batch.Id);
            await Update(batch);
        }

        private async Task<int> ReadFileAsBase64(byte[] bytes, Guid batchId)
        {
            using (Stream stream = new MemoryStream(bytes))
            {
                using (StreamReader sr = new StreamReader(stream))
                {
                    List<Log> logs = new List<Log>();
                    Log log = new Log();
                    while (sr.Peek() >= 0)
                    {
                        log = ConvertLineToLog(sr.ReadLine());
                        if (log != null)
                        {
                            log.BatchId = batchId;
                            logs.Add(log);
                        }
                    }
                    await _logService.Add(logs);
                    return logs.Count();
                }
            }
        }

        private Log ConvertLineToLog(string line)
        {
            Regex pattern = new Regex("(\\d+\\.\\d+\\.\\d+\\.\\d+) ([^ ]+) ([^ ]+) \\[(.+?)\\] \"(\\w+) ([^ ]+) HTTP/([\\d\\.]+)\" (\\d+) (\\d+) \"(.+?)\" \"(.+?)\"");

            List<string> parts = pattern.Match(line).Groups.Cast<Group>().Select(s => s.Value).Skip(1).ToList();

            if (parts.Count() == 0)
                return null;

            return new Log
            {
                Ip = parts[0],
                Date = DateTime.ParseExact(parts[3], "dd/MMM/yyyy:HH:mm:ss zzzz", CultureInfo.InvariantCulture),
                Method = parts[4],
                Url = parts[5],
                HttpVersion = parts[6],
                HttpStatus = int.Parse(parts[7]),
                Length = long.Parse(parts[8]),
                Referer = parts[9] == "-" ? "" : parts[9],
                UserAgent = parts[10]
            };
        }

        public async Task Update(Batch batch)
        {
            if (!ExecuteValidation(new BatchValidation(), batch))
                return;
            await _batchRepository.DetachLocal(l => l.Id == batch.Id);
            await _batchRepository.Update(batch);
        }

        public async Task Remove(Guid id)
        {
            await _logService.RemoveByBatchId(id);
            await _batchRepository.DetachLocal(l => l.Id == id);
            await _batchRepository.Remove(id);
        }

        public void Dispose()
        {
            _batchRepository?.Dispose();
        }
    }
}