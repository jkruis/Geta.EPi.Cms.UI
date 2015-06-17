using EPiServer.PlugIn;
using Geta.EPi.Cms.UI.Core.Models;

namespace Geta.EPi.Cms.UI.Core.BackingTypes
{
    [PropertyDefinitionTypePlugIn(Description = "A property for oEmbed meta-data.", DisplayName = "oEmbed meta")]
    public class PropertyoEmbedMeta : PropertyJsonSerializedObject<oEmbedMeta>
    {
    }
}