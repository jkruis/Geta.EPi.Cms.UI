define([
        "dojo/_base/declare",
        "epi",
        "epi/shell/command/_Command",
        "epi-cms/widget/ContentReferences",
        "epi/shell/widget/dialog/Dialog",
        "epi/shell/TypeDescriptorManager",
        "epi/i18n!epi/cms/nls/geta.cms.command.showrelatedcontentcommand"
],
    function (
        declare,
        epi,
        _Command,
        ContentReferences,
        Dialog,
        TypeDescriptorManager,
        resources
    ) {
        return declare("geta-epi-cms.command.ShowRelatedContentCommand", [_Command], {
            name: "ContentReferences",
            label: resources.label,
            tooltip: resources.tooltip,
            iconClass: "epi-iconReferences",
            canExecute: true,

            _execute: function () {
                var content = new ContentReferences({
                    model: {
                        contentData: this.model.contentData,
                        mode: "show",
                    }
                });

                content.startup();

                var dialog = new Dialog({
                    defaultActionsVisible: false,
                    focusActionsOnLoad: true,
                    destroyOnHide: true,
                    dialogClass: "epi-dialog-contentReferences",
                    title: TypeDescriptorManager.getResourceValue(this.model.contentData.typeIdentifier, "references"),
                    content: content
                });

                dialog.definitionConsumer.add({
                    name: "close",
                    label: epi.resources.action.close,
                    action: dialog.onCancel
                });

                dialog.show();

                var handle = content.on("viewReference", function () {
                    dialog.hide();
                    handle.remove();
                });
            }
        });
    });