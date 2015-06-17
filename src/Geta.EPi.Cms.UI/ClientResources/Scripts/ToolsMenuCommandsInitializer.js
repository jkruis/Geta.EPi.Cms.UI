define([
    "dojo",
    "dojo/_base/declare",
    "epi/_Module",
    "epi/dependency",
    "epi/routes",
    "geta-epi-cms/command/RelatedContentCommandProvider"
], function (
    dojo,
    declare,
    _Module,
    dependency,
    routes,
    RelatedContentCommandProvider
) {
    return declare("geta-epi-cms.ToolsMenuCommandsInitializer", [_Module], {
        initialize: function () {
            this.inherited(arguments);
            var commandregistry = dependency.resolve("epi.globalcommandregistry");
            var area = "epi.cms.contentdetailsmenu";
            commandregistry.registerProvider(area, new RelatedContentCommandProvider());
        }
    });
});