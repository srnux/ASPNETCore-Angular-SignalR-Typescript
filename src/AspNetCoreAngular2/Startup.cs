using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreAngular2.Models;
using AspNetCoreAngular2.Repositories;
using AspNetCoreAngular2.Services;
using AspNetCoreAngular2.ViewModels;
using AutoMapper;
using Microsoft.AspNet.Authentication.JwtBearer;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Infrastructure;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;

namespace AspNetCoreAngular2
{
    public class Startup
    {
        private readonly IApplicationEnvironment _environment;

        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            _environment = appEnv;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            var cert = new X509Certificate2(Path.Combine(_environment.ApplicationBasePath, "damienbodserver.pfx"), "");

            services.AddDataProtection();
            services.ConfigureDataProtection(configure =>
            {
                configure.SetApplicationName("AspNet5IdentityServerAngularImplicitFlow");
                configure.ProtectKeysWithCertificate(cert);
            });

            

            //Add Cors support to the service
            services.AddCors();

            var policy = new CorsPolicy();

            policy.Headers.Add("*");
            policy.Methods.Add("*");
            policy.Origins.Add("*");
            policy.SupportsCredentials = true;

            services.AddCors(x => x.AddPolicy("corsGlobalPolicy", policy));

            services.Configure<TimerServiceConfiguration>(Configuration.GetSection("TimeService"));

            var guestPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "angular2Demo")
                .Build();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("angular2DemoAdmin", policyAdmin =>
                {
                    policyAdmin.RequireClaim("role", "angular2Demo.admin");
                });
                options.AddPolicy("angular2DemoUser", policyUser =>
                {
                    policyUser.RequireClaim("role", "angular2Demo.user");
                });

            });

            services.AddMvc(options =>
            {
                options.Filters.Add(new AuthorizeFilter(guestPolicy));
            });

            services.AddSingleton<IFoodRepository, FoodRepository>();
            services.AddSingleton<ITimerService, TimerService>();

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
            });

            Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemViewModel>().ReverseMap();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors("corsGlobalPolicy");

            app.UseIISPlatformHandler();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            app.UseIdentityServerAuthentication(options =>
            {
                options.Authority = "https://localhost:44345/";
                options.ScopeName = "dataEventRecords";
                options.ScopeSecret = "dataEventRecordsSecret";

                options.AutomaticAuthenticate = true;
                // required if you want to return a 403 and not a 401 for forbidden responses
                options.AutomaticChallenge = true;
            });

            app.UseMvc();

            app.UseSignalR();
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
