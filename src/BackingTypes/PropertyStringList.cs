﻿using System;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.PlugIn;
using Geta.EPi.Cms.UI.Configuration;

namespace Geta.EPi.Cms.UI.BackingTypes
{
    /// <summary>
    /// Property type for storing a list of strings
    /// </summary>
    [EditorHint(GetaUIHint.StringList)]
    [PropertyDefinitionTypePlugIn(Description = "A property for list of strings", DisplayName = "String List")]
    public class PropertyStringList : PropertyLongString
    {
        protected String Separator = "\n";

        public String[] List
        {
            get
            {
                return (String[])Value;
            }
        }

        public override Type PropertyValueType
        {
            get
            {
                return typeof(String[]);
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            return LongString;
        }

        public override object Value
        {
            get
            {
                var value = base.Value as string;

                if (value == null)
                {
                    return null;
                }

                return value.Split(Separator.ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
            }
            set
            {
                if (value is String[])
                {
                    var s = String.Join(Separator, value as String[]);
                    base.Value = s;
                }
                else
                {
                    base.Value = value;
                }

            }
        }

        public override IPropertyControl CreatePropertyControl()
        {
            //No support for legacy edit mode
            return null;
        }
    }
}