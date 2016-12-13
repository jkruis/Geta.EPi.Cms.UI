using System;
using System.Web.Mvc;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using Geta.EPi.Cms.UI.Core.BackingTypes;

namespace Geta.EPi.Cms.UI.Core.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class KeyValueListAttribute : BackingTypeAttribute, IMetadataAware
    {
        public KeyValueListAttribute() : base(typeof(PropertyKeyValueList))
        {
        }

        public void OnMetadataCreated(ModelMetadata metadata)
        {
            var extendedMetaData = metadata as ExtendedMetadata;

            if (extendedMetaData == null)
            {
                return;
            }

            extendedMetaData.ClientEditingClass = "geta-epi-cms/editors/KeyValueList";
        }
    }
}