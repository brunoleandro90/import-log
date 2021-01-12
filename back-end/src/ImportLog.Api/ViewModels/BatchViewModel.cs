using System;
using System.ComponentModel.DataAnnotations;

namespace ImportLog.Api.ViewModels
{
    public class BatchViewModel
    {
        [Key]
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string FileName { get; set; }
        
        public int NumberLogs { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string FileAsBase64 { get; set; }

        [ScaffoldColumn(false)]
        public DateTime? RegistrationDate { get; set; }
    }
}