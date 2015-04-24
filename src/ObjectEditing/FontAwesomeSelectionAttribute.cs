using System;
using System.Web.Mvc;
using EPiServer.Shell.ObjectEditing;

namespace Geta.EPi.Cms.UI.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class FontAwesomeSelectionAttribute : Attribute, IMetadataAware
    {
        public void OnMetadataCreated(ModelMetadata metadata)
        {
            var extendedMetaData = metadata as ExtendedMetadata;

            if (extendedMetaData == null)
            {
                return;
            }

            extendedMetaData.ClientEditingClass = "geta-epi-cms.editors.FontAwesomeAutoSuggestEditor";
        }
    }
}
