using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Configs
// builder.Configuration.xxx

// Add services to the container.
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseOcelot().Wait();

app.UseAuthorization();

app.Run();
