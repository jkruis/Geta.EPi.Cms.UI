define([
    "dojo",
    "dojo/_base/declare",
    "epi/shell/command/_CommandProviderMixin",
    "geta-epi-cms/command/ShowRelatedContentCommand"
], function (dojo, declare, _CommandProviderMixin, ShowRelatedContentCommand) {
    return declare("geta-epi-cms.command.ToolsMenuCommandProvider", [_CommandProviderMixin], {

        constructor: function () {
            this.inherited(arguments);

            this.add("commands", new ShowRelatedContentCommand());
        }
    });
});