using AutoMapper;
using ImportLog.Api.Controllers;
using ImportLog.Api.ViewModels;
using ImportLog.Business.Intefaces;
using ImportLog.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            //return _mapper.Map<IEnumerable<BatchViewModel>>(await _batchService.Get());
            var ssss = _mapper.Map<IEnumerable<BatchViewModel>>(await _batchService.Get()); ;
            return ssss;
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<BatchViewModel>> Get(Guid id)
        {
            BatchViewModel batchViewModel = await GetBatch(id);

            if (batchViewModel == null) return NotFound();

            return batchViewModel;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<BatchViewModel>> Upload()
        {
            BatchViewModel batchViewModel = new BatchViewModel();

            IFormCollection formCollection = await Request.ReadFormAsync();
            IFormFile file = formCollection.Files.First();

            if (file.Length > 0)
            {
                batchViewModel.FileName = file.FileName;
                batchViewModel.ContentType = file.ContentType;
                batchViewModel.Length = file.Length;

                using (MemoryStream ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    batchViewModel.Bytes = ms.ToArray();
                }
            }
            else
            {
                ModelState.AddModelError("FileName", "Não foi possível fazer upload do arquivo.");
            }

            if (!ModelState.IsValid)
                return CustomResponse(ModelState);
            
            await _batchService.Add(_mapper.Map<Batch>(batchViewModel));

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