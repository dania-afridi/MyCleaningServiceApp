
namespace MyCleaningService.Server.Models
{
    public class City
    {
        public string? CityName { get; set; }
        public int PricePerSquareMeter { get; set; }
        public List<ExtraService> ? ExtraServices { get; set;} 

    }
}
