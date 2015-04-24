define([
    "dojo/_base/declare",
    "dojo/store/Memory",
    'xstyle/css!../styles/font-awesome.min.css'
],
function (
    declare,
    memorystore
) {
    return declare("geta-epi-cms.editors._FontAwesomeMixin", null, {
        _createMemoryStore: function () {
            var fontAwesomeStylesheet = this._getFontAwesomeStylesheet();
            var memoryStoreData = [];

            if (fontAwesomeStylesheet != null) {
                for (var i = 0; i < fontAwesomeStylesheet.cssRules.length; i++) {
                    var rule = fontAwesomeStylesheet.cssRules[i];

                    if (!rule.selectorText || rule.selectorText.indexOf("::before") == -1) {
                        continue;
                    }

                    var selectorTexts = rule.selectorText.split(",");

                    for (var j = 0; j < selectorTexts.length; j++) {
                        var selectorText = this._trimString(selectorTexts[j]).substring(1).replace("::before", "");
                        var iconName = selectorText.substring(3);
                        memoryStoreData.push({ id: selectorText, name: iconName, label: '<i class="fa fa-lg fa-fw ' + selectorText + '"></i>&nbsp;' + iconName });
                    }
                }

                memoryStoreData.sort(function (a, b) {
                    if (a.id < b.id) {
                        return -1;
                    }

                    if (a.id > b.id) {
                        return 1;
                    }

                    return 0;
                });
            }

            return new memorystore({ data: memoryStoreData });
        },

        _getFontAwesomeStylesheet: function () {
            for (var i = 0; i < document.styleSheets.length; i++) {
                try {
                    var sheetInfo = document.styleSheets[i];

                    if (sheetInfo.href.indexOf('font-awesome') > -1) {
                        return sheetInfo;
                    }
                } catch (e) {

                }
            }

            return null;
        },

        _trimString: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        },

        constructor: function() {
            
        }
    });
});