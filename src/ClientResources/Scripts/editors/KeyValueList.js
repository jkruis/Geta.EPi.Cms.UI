define(
    [
        "dojo/_base/array",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/on",

        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!../templates/KeyValueList.html",
        "dijit/form/ValidationTextBox",
        "dijit/form/Button",
        "epi/epi",
        "epi/shell/widget/_ValueRequiredMixin"
    ],
    function (
        array, 
        declare, 
        lang, 
        dom, 
        domConstruct, 
        domClass, 
        on, 
        widgetBase, 
        templatedMixin, 
        _WidgetsInTemplateMixin, 
        template, 
        textbox, 
        button, 
        epi, 
        valueRequiredMixin
     ) {
        return declare("geta-epi-cms.editors.KeyValueList", [widgetBase, templatedMixin, _WidgetsInTemplateMixin, valueRequiredMixin], {
            templateString: template,
            baseClass: "keyValueList",
            addButtonLabel: "Add new",
            value: null,
            widgetsInTemplate: true,

            constructor: function () {
                this.inherited(arguments);
                this._keyValues = [];
            },

            postCreate: function () {
                this.inherited(arguments);

                this.btnAddNewItem.on("click", lang.hitch(this, function (e) {
                    this.addNewItem(e);
                }));
            },

            destroy: function () {
                var _a;
                while (_a = this._keyValues.pop()) {
                }

                this.inherited(arguments);
            },

            _calculateValue: function () {
                var propertyValue = [];

                array.forEach(this._keyValues, function (entry) {
                    var key = entry.key,
                        value = entry.value;

                    var item = {
                        key: key.value,
                        value: value.value
                    };

                    propertyValue.push(item);
                });

                if (this._started && epi.areEqual(this.value, propertyValue)) {
                    return;
                }

                this._set("value", propertyValue);
                this.onChange(propertyValue);
            },

            _setValueAttr: function (value) {
                this._set("value", value);

                array.forEach(value, this._addElementsForItem, this); // Add 'this' to end to make sure the 'this.domNode' works in method. Why?!
            },

            _onInputWidgetChanged: function(e) {
                this._calculateValue();
            },

            addNewItem: function () {
                var newItem = this._addElementsForItem({ "key": "", "value": "" });
                newItem.key.focus();
            },

            _addElementsForItem: function (item) {
                var tr = domConstruct.create("tr", null, this.containerNode);
                tr.setAttribute("class", "keyValueContainer");

                var firstTd = domConstruct.create("td", null, tr);
                var secondTd = domConstruct.create("td", null, tr);
                var thirdTd = domConstruct.create("td", null, tr);

                var key = this._getTextbox(item.key, "key").set("placeholder", "Label");

                key.placeAt(firstTd);

                var value = this._getTextbox(item.value, "value").set("placeholder", "Content");

                value.placeAt(secondTd);

                var btn = new button({
                    label: "X",
                    main: this,
                    container: tr
                });

                btn.setAttribute("class", "btnRemove");

                btn.on("click", function () {
                    this.main._removeItem(this.container);
                    domConstruct.destroy(this.container);
                    this.main._onInputWidgetChanged();
                });

                btn.placeAt(thirdTd);

                var newItem = this._pushItem(tr, key, value);
                return newItem;
            },

            _removeItem: function (tr) {
                var newItems = [];

                array.forEach(this._keyValues, function (entry) {
                    if (entry.tr != tr) {
                        newItems.push(entry);
                    }
                });

                this._keyValues = newItems;
            },
            _pushItem: function (tr, key, value) {
                var o = {
                    tr: tr,
                    key: key,
                    value: value
                };

                this._keyValues.push(o);
                return o;
            },
            _getTextbox: function (value, cssClass) {
                var tb = new textbox({
                    value: value
                });

                tb.setAttribute("class", cssClass);

                tb.on("change", lang.hitch(this, this._onInputWidgetChanged));

                return tb;
            }
        });
    });