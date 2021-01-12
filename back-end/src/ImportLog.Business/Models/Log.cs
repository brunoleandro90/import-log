using System;

namespace ImportLog.Business.Models
{
    public class Log : Entity
    {
        public string Ip { get; set; }
        public DateTime Date { get; set; }
        public string Method { get; set; }
        public string Url { get; set; }
        public string HttpVersion { get; set; }
        public int HttpStatus { get; set; }
        public long Length { get; set; }
        public string Referer { get; set; }
        public string UserAgent { get; set; }
        public Guid BatchId { get; set; }
        public virtual Batch Batch{ get; set; }
    }
}