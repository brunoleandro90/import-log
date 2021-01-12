using System;
using System.ComponentModel.DataAnnotations;

namespace ImportLog.Api.ViewModels
{
    public class LogViewModel
    {
        [Key]
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Ip { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public DateTime Date { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Method { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Url { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string HttpVersion { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string HttpStatus { get; set; }
        
        public string Length { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Referer { get; set; }        
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string UserAgent { get; set; }

        public Guid? BatchId { get; set; }

        [ScaffoldColumn(false)]
        public DateTime RegistrationDate { get; set; }
    }
}