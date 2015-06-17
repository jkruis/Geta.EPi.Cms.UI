using EPiServer.PlugIn;
using Geta.EPi.Cms.UI.Core.Models;

namespace Geta.EPi.Cms.UI.Core.BackingTypes
{
    [PropertyDefinitionTypePlugIn(Description = "A property for storing a Google Place", DisplayName = "Google Place")]
    public class PropertyGooglePlace : PropertyJsonSerializedObject<GooglePlace>
    {
    }
}