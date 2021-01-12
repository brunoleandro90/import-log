using AutoMapper;
using ImportLog.Api.Configuration;
using ImportLog.Api.Extensions;
using ImportLog.Data.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;

namespace ImportLog.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostEnvironment hostEnvironment)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(hostEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{hostEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();

            if (hostEnvironment.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<ImportLogDbContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            
            IdentityModelEventSource.ShowPII = true;

            services.AddIdentityConfiguration(Configuration);

            services.AddAutoMapper(typeof(Startup));

            services.WebApiConfig();

            services.AddSwaggerConfig();

            services.ResolveDependencies();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
        {
            app.UseDeveloperExceptionPage();
            
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseMvcConfiguration();

            app.UseSwaggerConfig(provider);
        }
    }
}
