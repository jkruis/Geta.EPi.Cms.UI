define(
[
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/request/xhr",
    "dojo/text!../templates/oEmbedMeta.html",

    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_Widget",
    "dijit/form/ValidationTextBox",
    "epi/shell/widget/_ValueRequiredMixin",
    "epi/dependency",
    "epi/epi",
    "xstyle/css!../styles/oEmbedMetaEditor.css"
],
function (declare, lang, on, domConstruct, xhr, template, _TemplatedMixin, _WidgetsInTemplateMixin, _Widget, TextBox, _ValueRequiredMixin, dependency, epi) {
    return declare("geta-epi-cms.editors.oEmbedMetaEditor", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _ValueRequiredMixin], {
        templateString: template,
        value: null,
        widgetsInTemplate: true,
        postMixInProperties: function() {
          
        },
        postCreate: function() {
            this.inherited(arguments);
            this.url.set("intermediateChanges", this.intermediateChanges);
            this.connect(this.url, "onChange", this._onInputWidgetChanged);
        },
        onChange: function(value) {
        },
        isValid: function () {
            return this.url.isValid();
        },
        _updateValue: function (value) {

            if (this._started && this.value && epi.areEqual(this.value.url, value)) {
                this._renderPreview(this.value);
                return;
            }

            if ((value == "" || !value)) {

                if (this.value)
                    this._set("value", null);

                this._renderPreview();
                return;
            }

            var scope = this;
            var response;

            xhr.get(this.siteUrl + "api/oembed", {
                query: { url: value },
                sync: true,
                handleAs: "json"
            }).then(function (data) {

                response = {
                    url: value,
                    title: data.Title,
                    description: data.Description,
                    embedCode: data.Html,
                    thumbnail: data.Thumbnail_Url
                };

                scope.set("value", response);
                scope.onChange(response);

            }, function(err) {
                console && console.log(err);
            });

            this._renderPreview(response);
        },
        _onInputWidgetChanged: function (value) {
            this._updateValue(value);
        },
        _renderPreview: function(data) {

            this.container.innerHTML = "";

            if (data != null && data.embedCode != null)
            {
                domConstruct.create("div", { class: "video-container", style: "background-image:url('" + data.thumbnail + "')" }, this.container);
            }
        },
        _setValueAttr: function (value) {
            if (value && typeof (value) == "object")
            {
                this.url.set("value", value.url);
            }

            this._set("value", value);
        },
        _setReadOnlyAttr: function (value) {
            this._set("readOnly", value);
            this.url.set("readOnly", value);
        }
    });
}
)