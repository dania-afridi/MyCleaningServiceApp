using Microsoft.AspNetCore.Mvc;
using MyCleaningService.Server.Models;
using System.Runtime;

namespace MyCleaningService.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityController : ControllerBase
    {
        private static readonly Dictionary<string, (int Price, List<ExtraService> Services)> CityPrice = new()
        {
            {"Stockholm",
                ( 65, 
                new List<ExtraService> {
                    new ExtraService{ Name = "Windows Cleaning", ServicePrice = 300 },
                    new ExtraService{ Name = "Balkony Cleaning", ServicePrice = 150 }
                } )},
            { "Uppsala",
                ( 55,
                new List<ExtraService> {
                    new ExtraService{ Name = "Windows Cleaning", ServicePrice = 300 },
                    new ExtraService{ Name = "Balkony Cleaning", ServicePrice = 150 },
                    new ExtraService{ Name = "Trash Removel", ServicePrice = 400 }
                }) }
        };
        
        private readonly ILogger<CityController> _logger;

        public CityController(ILogger<CityController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetCity")]        
        public IEnumerable<City> Get()
        {
            return CityPrice.Select(cityPrice => new City
            {
                CityName = cityPrice.Key,
                PricePerSquareMeter = cityPrice.Value.Price,
                ExtraServices = cityPrice.Value.Services
            }).ToArray();

            
        }

    }
}
