using AutoMapper;
using ImportLog.Api.Controllers;
using ImportLog.Api.ViewModels;
using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImportLog.Api.V1.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/log")]
    public class LogController : MainController
    {
        private readonly ILogService _logService;
        private readonly IMapper _mapper;

        public LogController(INotifier notifier,
                              ILogService logService,
                              IMapper mapper,
                              IUser user) : base(notifier, user)
        {
            _logService = logService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<LogViewModel>> Get()
        {
            return _mapper.Map<IEnumerable<LogViewModel>>(await _logService.Get());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<LogViewModel>> Get(Guid id)
        {
            LogViewModel logViewModel = await GetLog(id);

            if (logViewModel == null) return NotFound();

            return logViewModel;
        }

        [HttpPost]
        public async Task<ActionResult<LogViewModel>> Add(LogViewModel logViewModel)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            await _logService.Add(_mapper.Map<Log>(logViewModel));

            return CustomResponse(logViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, LogViewModel logViewModel)
        {
            if (id != logViewModel.Id)
            {
                NotifyError("Os ids informados não são iguais.");
                return CustomResponse();
            }

            LogViewModel logAtualizacao = await GetLog(id);
            if (logAtualizacao == null)
            {
                NotifyError($"Não foi localizado o log pelo id {id}.");
                return CustomResponse();
            }
            logViewModel.BatchId = logAtualizacao.BatchId;
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            await _logService.Update(_mapper.Map<Log>(logViewModel));

            return CustomResponse(logViewModel);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<LogViewModel>> Remove(Guid id)
        {
            LogViewModel log = await GetLog(id);

            if (log == null) return NotFound();

            await _logService.Remove(id);

            return CustomResponse(log);
        }

        private async Task<LogViewModel> GetLog(Guid id)
        {
            return _mapper.Map<LogViewModel>(await _logService.Get(id));
        }
    }
}