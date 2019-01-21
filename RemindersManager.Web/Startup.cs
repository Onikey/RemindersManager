using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RemindersManager.Web.Data;
using RemindersManager.Web.Services;

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

			services.AddScoped<IRemindersService, RemindersService>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				UpdateDatabase(app);

				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
					// To learn more about options for serving an Angular SPA from ASP.NET Core,
					// see https://go.microsoft.com/fwlink/?linkid=864501

					spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}

		private static void UpdateDatabase(IApplicationBuilder app)
		{

			using (var serviceScope = app.ApplicationServices
				.GetRequiredService<IServiceScopeFactory>()
				.CreateScope())
			{
				using (var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>())
				{
					context.Database.Migrate();
				}
			}
		}
	}
}