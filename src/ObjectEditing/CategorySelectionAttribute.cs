using System;
using EPiServer.DataAbstraction;

namespace Geta.EPi.Cms.UI.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CategorySelectionAttribute : Attribute
    {
        public bool Multiple { get; set; }
        public int RootCategoryId { get; set; }
        public string RootCategoryName { get; set; }

        public CategorySelectionAttribute()
        {
            Multiple = true;
        }

        public int GetRootCategoryId()
        {
            if (RootCategoryId > 0)
            {
                return RootCategoryId;
            }

            if (!string.IsNullOrEmpty(RootCategoryName))
            {
                var category = Category.Find(RootCategoryName);

                if (category != null)
                {
                    return category.ID;
                }
            }

            return Category.GetRoot().ID;
        }
    }
}