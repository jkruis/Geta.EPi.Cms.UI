using System;
using EPiServer.Core;
using Newtonsoft.Json;

namespace Geta.EPi.Cms.UI.Core.BackingTypes
{
    public abstract class PropertyJsonSerializedObject<T> : PropertyLongString where T : class
    {
        public override Type PropertyValueType
        {
            get { return typeof(T); }
        }

        // No need to deserialize every time there is a get against the property
        protected T _value;

        public override object Value
        {
            get
            {
                if (_value != null) return _value;

                var value = base.Value as string;

                if (value == null) return null;

                _value = JsonConvert.DeserializeObject<T>(value);

                return _value;
            }
            set
            {
                if (value is T)
                {
                    _value = null;
                    base.Value = JsonConvert.SerializeObject(value);
                    return;
                }

                base.Value = value;
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            return LongString;
        }

        public override IPropertyControl CreatePropertyControl()
        {
            //No support for legacy edit mode
            return null;
        }
    }
}