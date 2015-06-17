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
        "epi/shell/widget/_ValueRequiredMixin",
        'xstyle/css!../styles/font-awesome.min.css',
        'xstyle/css!../styles/KeyValueList.css'
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

                this._updateSortIcons();
                this._set("value", propertyValue);
                this.onChange(propertyValue);
            },

            _setValueAttr: function (value) {
                this._set("value", value);

                array.forEach(value, this._addElementsForItem, this);
                this._updateSortIcons();
            },

            _onInputWidgetChanged: function(e) {
                this._calculateValue();
            },

            _updateSortIcons: function() {
                if (this._keyValues.length < 1) {
                    return;
                }

                var firstIndex = 0;
                var lastIndex = this._keyValues.length - 1;
                var firstItem = this._keyValues[firstIndex];

                array.forEach(this._keyValues, function(entry) {
                    domClass.remove(entry.sortUpLink, "disabled");
                    domClass.remove(entry.sortDownLink, "disabled");
                });

                domClass.add(firstItem.sortUpLink, "disabled");

                if (lastIndex > firstIndex) {
                    var lastItem = this._keyValues[lastIndex];
                    domClass.add(lastItem.sortDownLink, "disabled");
                } else {
                    domClass.add(firstItem.sortDownLink, "disabled");
                }
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
                var fourthTd = domConstruct.create("td", null, tr);
                var fifthTd = domConstruct.create("td", null, tr);

                // Key input
                var key = this._getTextbox(item.key, "key").set("placeholder", "Label");
                key.placeAt(firstTd);

                // Value input
                var value = this._getTextbox(item.value, "value").set("placeholder", "Content");
                value.placeAt(secondTd);

                // Sort up button
                var sortUpLink = domConstruct.create("a", { href: "javascript:void(0)" }, thirdTd);
                var sortUpIcon = domConstruct.create("i", null, sortUpLink);
                sortUpIcon.setAttribute("class", "fa fa-fw fa-arrow-up");

                // Sort down button
                var sortDownLink = domConstruct.create("a", { href: "javascript:void(0)" }, fourthTd);
                var sortDownIcon = domConstruct.create("i", null, sortDownLink);
                sortDownIcon.setAttribute("class", "fa fa-fw fa-arrow-down");

                on(sortUpLink, "click", lang.hitch(this, function (e) {
                    if (domClass.contains(sortUpLink, "disabled")) {
                        return false;
                    }

                    this._sortItemUp(tr, e);
                    return false;
                }));

                on(sortDownLink, "click", lang.hitch(this, function(e) {
                    if (domClass.contains(sortDownLink, "disabled")) {
                        return false;
                    }

                    this._sortItemDown(tr, e);
                    return false;
                }));

                // Remove button
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

                btn.placeAt(fifthTd);

                var newItem = this._pushItem(tr, key, value, sortUpLink, sortDownLink);
                return newItem;
            },

            _getItemIndex: function (tr) {
                for (var i = 0; i < this._keyValues.length; i++) {
                    var entry = this._keyValues[i];

                    if (entry.tr == tr) {
                        return i;
                    }
                }

                return -1;
            },

            _removeItem: function (tr) {
                var newItems = [];

                array.forEach(this._keyValues, function (entry) {
                    if (entry.tr != tr) {
                        newItems.push(entry);
                    }
                });

                this._keyValues = newItems;
                this._updateSortIcons();
            },

            _pushItem: function (tr, key, value, sortUpLink, sortDownLink) {
                var o = {
                    tr: tr,
                    key: key,
                    value: value,
                    sortUpLink: sortUpLink,
                    sortDownLink: sortDownLink
                };

                this._keyValues.push(o);
                this._updateSortIcons();
                return o;
            },

            _sortItemUp: function (item) {
                var prevItem = item.previousElementSibling;

                if (prevItem != null) {
                    this._moveKeyValueItem(this._getItemIndex(item), -1);
                    var parent = item.parentElement;
                    parent.insertBefore(item, prevItem);

                    this._onInputWidgetChanged();
                }
            },

            _sortItemDown: function (item) {
                var nextItem = item.nextElementSibling;

                if (nextItem != null) {
                    this._moveKeyValueItem(this._getItemIndex(item), 1);
                    var parent = item.parentElement;

                    if (nextItem == parent.lastChild) {
                        parent.appendChild(item);
                    } else {
                        parent.insertBefore(item, nextItem.nextElementSibling);
                    }

                    this._onInputWidgetChanged();
                }
            },

            _moveKeyValueItem: function (index, step) {
                var newIndex = index + step;
                this._keyValues.splice(newIndex, 0, this._keyValues.splice(index, 1)[0]);
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