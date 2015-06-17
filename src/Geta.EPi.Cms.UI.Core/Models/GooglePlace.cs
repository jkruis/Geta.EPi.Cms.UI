namespace Geta.EPi.Cms.UI.Core.Models
{
    public class GooglePlace
    {
        public virtual string PlaceId { get; set; }
        public virtual string Address { get; set; }
        public virtual double Latitude { get; set; }
        public virtual double Longitude { get; set; }
    }
}