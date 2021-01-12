using System;
using System.Collections.Generic;

namespace ImportLog.Business.Models
{
    public class Batch : Entity
    {
        public string FileName { get; set; }
        public double NumberLogs { get; set; }
        public string FileAsBase64 { get; set; }
        public virtual IEnumerable<Log> Logs { get; set; }
    }
}