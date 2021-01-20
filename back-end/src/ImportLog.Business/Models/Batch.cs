using System;
using System.Collections.Generic;

namespace ImportLog.Business.Models
{
    public class Batch : Entity
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long Length { get; set; }
        public byte[] Bytes { get; set; }
        public virtual IEnumerable<Log> Logs { get; set; }
    }
}