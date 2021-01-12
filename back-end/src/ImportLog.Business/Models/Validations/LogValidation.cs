using FluentValidation;

namespace ImportLog.Business.Models.Validations
{
    public class LogValidation : AbstractValidator<Log>
    {
        public LogValidation()
        {
            RuleFor(c => c.Ip)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.Date)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");
            
            RuleFor(c => c.Method)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.Url)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.HttpVersion)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.HttpStatus)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.Referer)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");

            RuleFor(c => c.UserAgent)
                .NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}