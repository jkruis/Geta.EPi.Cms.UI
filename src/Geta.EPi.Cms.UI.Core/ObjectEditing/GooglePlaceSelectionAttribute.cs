using System;
using System.Web.Mvc;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using Geta.EPi.Cms.UI.Core.BackingTypes;

namespace Geta.EPi.Cms.UI.Core.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class GooglePlaceSelectionAttribute : BackingTypeAttribute, IMetadataAware
    {
        public GooglePlaceSelectionAttribute() : base(typeof(PropertyGooglePlace))
        {
        }

        public void OnMetadataCreated(ModelMetadata metadata)
        {
            var extendedMetaData = metadata as ExtendedMetadata;

            if (extendedMetaData == null)
            {
                return;
            }

            extendedMetaData.ClientEditingClass = "geta-epi-cms.editors.GooglePlaceSelection";
        }
    }
}