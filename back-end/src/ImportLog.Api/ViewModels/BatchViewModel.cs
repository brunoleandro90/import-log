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

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string ContentType { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public long Length { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public byte[] Bytes { get; set; }

        [ScaffoldColumn(false)]
        public DateTime? RegistrationDate { get; set; }
    }
}