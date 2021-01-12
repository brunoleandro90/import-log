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
    [Route("api/v{version:apiVersion}/batch")]
    public class BatchController : MainController
    {
        private readonly IBatchService _batchService;
        private readonly IMapper _mapper;

        public BatchController(INotifier notifier,
                              IBatchService batchService,
                              IMapper mapper,
                              IUser user) : base(notifier, user)
        {
            _batchService = batchService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<BatchViewModel>> Get()
        {
            return _mapper.Map<IEnumerable<BatchViewModel>>(await _batchService.Get());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<BatchViewModel>> Get(Guid id)
        {
            BatchViewModel batchViewModel = await GetBatch(id);

            if (batchViewModel == null) return NotFound();

            return batchViewModel;
        }

        [HttpPost]
        public async Task<ActionResult<BatchViewModel>> Add(BatchViewModel batchViewModel)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            await _batchService.Add(_mapper.Map<Batch>(batchViewModel));

            return CustomResponse(batchViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, BatchViewModel batchViewModel)
        {
            if (id != batchViewModel.Id)
            {
                NotifyError("Os ids informados não são iguais.");
                return CustomResponse();
            }

            BatchViewModel batchAtualizacao = await GetBatch(id);
            if (batchAtualizacao == null)
            {
                NotifyError($"Não foi localizado o batch pelo id {id}.");
                return CustomResponse();
            }

            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            await _batchService.Update(_mapper.Map<Batch>(batchViewModel));

            return CustomResponse(batchViewModel);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<BatchViewModel>> Remove(Guid id)
        {
            BatchViewModel batch = await GetBatch(id);

            if (batch == null) return NotFound();

            await _batchService.Remove(id);

            return CustomResponse(batch);
        }

        private async Task<BatchViewModel> GetBatch(Guid id)
        {
            return _mapper.Map<BatchViewModel>(await _batchService.Get(id));
        }
    }
}