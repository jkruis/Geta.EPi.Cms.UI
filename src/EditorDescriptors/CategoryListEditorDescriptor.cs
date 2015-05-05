using System;
using System.Collections.Generic;
using System.Linq;
using EPiServer.Cms.Shell.UI.ObjectEditing.EditorDescriptors;
using EPiServer.Core;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using Geta.EPi.Cms.UI.ObjectEditing;

namespace Geta.EPi.Cms.UI.EditorDescriptors
{
    [EditorDescriptorRegistration(TargetType = typeof(CategoryList), EditorDescriptorBehavior = EditorDescriptorBehavior.OverrideDefault)]
    public class CustomCategoryListEditorDescriptor : CategoryListEditorDescriptor
    {
        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            base.ModifyMetadata(metadata, attributes);
            var categorySelectionAttribute = attributes.OfType<CategorySelectionAttribute>().FirstOrDefault();

            if (categorySelectionAttribute != null)
            {
                metadata.EditorConfiguration["multiple"] = categorySelectionAttribute.Multiple;
                metadata.EditorConfiguration["root"] = categorySelectionAttribute.GetRootCategoryId();
            }
        }
    }
}