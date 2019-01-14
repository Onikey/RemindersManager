using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RemindersManager.Web.Data;
using System.IO;

namespace RemindersManager.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // still fail run in release config
            if (!env.IsDevelopment())
            {
                app.Use(async (context, next) => {
                    await next();
                    if (context.Response.StatusCode == 404 &&
                       !Path.HasExtension(context.Request.Path.Value) &&
                       !context.Request.Path.Value.StartsWith("/api/"))
                    {
                        context.Request.Path = "/index.html";
                        await next();
                    }
                });
                app.UseMvcWithDefaultRoute();
                app.UseDefaultFiles();
                app.UseStaticFiles();
            }
        }
    }
}
