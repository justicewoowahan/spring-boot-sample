import Woowahan from 'woowahan';
import template from './shop-owner-item-view.hbs';

export const shopOwnerSearchItem = Woowahan.ItemView.create('shopOwnerSearchItem', {
    template: template,

    onSelectedRow(event, trigger) {
        this.dispatch(Woowahan.Event.create('shopOwnerChecked', this.getModel()));
        this.clearHighlight();
        this.doHighlight(event);
        trigger(this.getModel());
    },
    clearHighlight() {
        $('#tbl-added-shops').find('.selected-row')
            .each(function () {
                $(this).removeClass('selected-row');
            });

    },
    doHighlight(event) {
        var $target = $(event.target.parentNode);
        console.log(`tagName:${event.target.parentNode.tagName}`);

        if (event.target.parentNode.tagName === 'TD') {
            $target = $target.parent();
        }
        $target.addClass('selected-row');
    },
});