using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using Geta.EPi.Cms.UI.Core.Models;

namespace Geta.EPi.Cms.UI.Core.EditorDescriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(oEmbedMeta))]
    public class oEmbedMetaEditorDescriptor : EditorDescriptor
    {
        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            var url = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);

            base.ModifyMetadata(metadata, attributes);
            ClientEditingClass = "geta-epi-cms.editors.oEmbedMetaEditor";
            metadata.EditorConfiguration["embedlyApiUrl"] = ConfigurationManager.AppSettings["Embedly:ApiUrl"];
            metadata.EditorConfiguration["embedlyApiKey"] = ConfigurationManager.AppSettings["Embedly:ApiKey"];
            metadata.EditorConfiguration["siteUrl"] = VirtualPathUtility.AppendTrailingSlash(url);
        }
    }
}