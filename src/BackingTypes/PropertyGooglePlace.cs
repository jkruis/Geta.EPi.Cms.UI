using EPiServer.PlugIn;
using Geta.EPi.Cms.UI.Models;

namespace Geta.EPi.Cms.UI.BackingTypes
{
    [PropertyDefinitionTypePlugIn(Description = "A property for storing a Google Place", DisplayName = "Google Place")]
    public class PropertyGooglePlace : PropertyJsonSerializedObject<GooglePlace>
    {
    }
}