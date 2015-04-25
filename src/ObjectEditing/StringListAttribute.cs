using System;
using System.Web.Mvc;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using Geta.EPi.Cms.UI.BackingTypes;

namespace Geta.EPi.Cms.UI.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class StringListAttribute : BackingTypeAttribute, IMetadataAware
    {
        public StringListAttribute() : base(typeof(PropertyStringList))
        {
        }

        public void OnMetadataCreated(ModelMetadata metadata)
        {
            var extendedMetaData = metadata as ExtendedMetadata;

            if (extendedMetaData == null)
            {
                return;
            }

            extendedMetaData.ClientEditingClass = "geta-epi-cms.editors.StringList";
        }
    }
}