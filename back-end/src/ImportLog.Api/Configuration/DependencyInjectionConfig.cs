using ImportLog.Api.Extensions;
using ImportLog.Business.Intefaces;
using ImportLog.Business.Notifications;
using ImportLog.Business.Services;
using ImportLog.Data.Context;
using ImportLog.Data.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ImportLog.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<ImportLogDbContext>();
            services.AddScoped<ILogRepository, LogRepository>();
            services.AddScoped<IBatchRepository, BatchRepository>();
            
            services.AddScoped<INotifier, Notifier>();
            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IBatchService, BatchService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUser, AspNetUser>();

            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            return services;
        }
    }
}