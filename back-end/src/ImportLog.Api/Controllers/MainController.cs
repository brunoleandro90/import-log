using ImportLog.Business.Intefaces;
using ImportLog.Business.Notifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ImportLog.Api.Controllers
{
    [ApiController]
    public abstract class MainController : ControllerBase
    {
        private readonly INotifier _notifier;
        public readonly IUser AppUser;

        protected Guid UsuarioId { get; set; }
        protected bool UsuarioAutenticado { get; set; }

        protected MainController(INotifier notifier, 
                                 IUser appUser)
        {
            _notifier = notifier;
            AppUser = appUser;

            if (appUser.IsAuthenticated())
            {
                UsuarioId = appUser.GetUserId();
                UsuarioAutenticado = true;
            }
        }

        protected bool OperationIsValid()
        {
            return !_notifier.HasNotification();
        }

        protected ActionResult CustomResponse(object result = null)
        {
            if (OperationIsValid())
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = _notifier.GetNotifications().Select(n => n.Mensagem)
            });
        }

        protected ActionResult CustomResponse(ModelStateDictionary modelState)
        {
            if(!modelState.IsValid) NotifyErrorModelInvalida(modelState);
            return CustomResponse();
        }

        protected void NotifyErrorModelInvalida(ModelStateDictionary modelState)
        {
            IEnumerable<ModelError> erros = modelState.Values.SelectMany(e => e.Errors);
            foreach (ModelError erro in erros)
            {
                string errorMsg = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                NotifyError(errorMsg);
            }
        }

        protected void NotifyError(string mensagem)
        {
            _notifier.Handle(new Notification(mensagem));
        }
    }
}
