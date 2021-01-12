using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using ImportLog.Business.Notifications;
using FluentValidation;
using FluentValidation.Results;

namespace ImportLog.Business.Services
{
    public abstract class BaseService
    {
        private readonly INotifier _notifier;

        protected BaseService(INotifier notifier)
        {
            _notifier = notifier;
        }

        protected void Notify(ValidationResult validationResult)
        {
            foreach (ValidationFailure error in validationResult.Errors)
            {
                Notify(error.ErrorMessage);
            }
        }

        protected void Notify(string mensagem)
        {
            _notifier.Handle(new Notification(mensagem));
        }

        protected bool ExecuteValidation<TV, TE>(TV validacao, TE entidade) where TV : AbstractValidator<TE> where TE : Entity
        {
            ValidationResult validator = validacao.Validate(entidade);

            if(validator.IsValid) return true;

            Notify(validator);

            return false;
        }
    }
}