﻿using System;
using System.Configuration;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;

namespace Geta.EPi.Cms.UI.Core.ObjectEditing
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class CategorySelectionAttribute : Attribute
    {
        /// <summary>
        ///  ID of the root category.
        /// </summary>
        public int RootCategoryId { get; set; }

        /// <summary>
        /// Name of the root category.
        /// </summary>
        public string RootCategoryName { get; set; }

        /// <summary>
        /// The appSetting key containing the root category id to use.
        /// </summary>
        public string RootCategoryAppSettingKey { get; set; }

        public int GetRootCategoryId()
        {
            if (RootCategoryId > 0)
            {
                return RootCategoryId;
            }

            var categoryRepo = ServiceLocator.Current.GetInstance<CategoryRepository>();

            if (!string.IsNullOrWhiteSpace(RootCategoryName))
            {
                var category = categoryRepo.Get(RootCategoryName);

                if (category != null)
                {
                    return category.ID;
                }
            }

            if (!string.IsNullOrWhiteSpace(RootCategoryAppSettingKey))
            {
                string appSettingValue = ConfigurationManager.AppSettings[RootCategoryAppSettingKey];
                int rootCategoryId;

                if (!string.IsNullOrWhiteSpace(appSettingValue) && int.TryParse(appSettingValue, out rootCategoryId))
                {
                    return rootCategoryId;
                }
            }

            return categoryRepo.GetRoot().ID;
        }
    }
}