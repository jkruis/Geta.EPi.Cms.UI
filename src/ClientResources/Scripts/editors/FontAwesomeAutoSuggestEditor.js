define([
    "dojo/_base/declare",
    "geta-epi-cms/editors/_FontAwesomeMixin",
    "epi/shell/form/AutoCompleteSelectionEditor"
],
function (
    declare,
    _FontAwesomeMixin,
    AutoCompleteSelectionEditor
) {
    return declare("geta-epi-cms.editors.FontAwesomeAutoSuggestEditor", [_FontAwesomeMixin, AutoCompleteSelectionEditor], {
        labelAttr: "label",
        labelType: "html",

        postCreate: function() {
            this.inherited(arguments);
            this.store = this._createMemoryStore();
        }
    });
});