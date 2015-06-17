using System.Threading.Tasks;
using System.Web.Http;
using EPiServer.ServiceLocation;
using Geta.EPi.Cms.UI.Integrations.Embedly;

namespace Geta.EPi.Cms.UI.Controllers
{
    [Authorize]
    public class oEmbedMetaController : ApiController
    {
        public async Task<oEmbedResponse> Get(string url)
        {
            var wrapper = ServiceLocator.Current.GetInstance<EmbedlyWrapper>();

            return await wrapper.oEmbed(url);
        }
    }
}