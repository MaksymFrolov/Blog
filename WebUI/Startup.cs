using Microsoft.EntityFrameworkCore;

namespace WebUI
{
    public class Startup
    {
        IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Configuration.GetConnectionString("Blog");

            services.AddDbContext<ContextApp>(t => t.UseSqlServer(connection));

            services.AddAutoMapper(typeof(BusinessProfile).Assembly);

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IMap, Map>();

            services.AddTransient<IPersonService, PersonService>();

            services.AddTransient<IPostService, PostService>();

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => 
            { 
                endpoints.MapControllers(); 
            });
        }
    }
}
