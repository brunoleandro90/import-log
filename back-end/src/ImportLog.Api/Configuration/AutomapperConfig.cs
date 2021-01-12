using AutoMapper;
using ImportLog.Api.ViewModels;
using ImportLog.Business.Models;

namespace ImportLog.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<LogViewModel, Log>();
            CreateMap<BatchViewModel, Batch >();

            CreateMap<Log, LogViewModel>();
            CreateMap<Batch, BatchViewModel>();
        }
    }
}