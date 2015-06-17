using System.Collections.Generic;
using EPiServer.PlugIn;

namespace Geta.EPi.Cms.UI.Core.BackingTypes
{
    [PropertyDefinitionTypePlugIn(Description = "A property for listing key/values", DisplayName = "Key value list")]
    public class PropertyKeyValueList : PropertyJsonSerializedObject<IEnumerable<KeyValuePair<string, string>>>
    {
    }
}