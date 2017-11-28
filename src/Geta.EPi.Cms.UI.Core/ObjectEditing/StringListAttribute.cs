using System;
using System.Web.Mvc;
using EPiServer.DataAnnotations;
using EPiServer.Shell.ObjectEditing;
using Geta.EPi.Cms.UI.Core.BackingTypes;
using EPiServer.Framework.DataAnnotations;
using Geta.EPi.Cms.UI.Core.Configuration;
using EPiServer.Shell;

namespace Geta.EPi.Cms.UI.Core.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    [EditorHint(GetaUIHint.StringList)]
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

            extendedMetaData.ClientEditingClass = "geta-epi-cms/editors/StringList";
            extendedMetaData.CustomEditorSettings["uiType"] = extendedMetaData.ClientEditingClass;
            extendedMetaData.CustomEditorSettings["uiWrapperType"] = UiWrapperType.Floating;
        }
    }
}