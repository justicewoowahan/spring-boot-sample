import Woowahan from 'woowahan';
import template from "./contract-list-item.hbs";

export const contractItem = Woowahan.ItemView.create('contractItem', {
    template: template,

    onSelectedRow(event, trigger) {
        this._clearAllHighlight()
        $(event.target.parentNode).addClass('selected-row');
        this.dispatch(Woowahan.Event.create('contractChecked',this.getModel()));
        trigger(this.getModel());
        // this.dispatch(Woowahan.Event.create('shopChecked', this.getModel()));
        // trigger(this.getModel());
    },
    _clearAllHighlight() {
        $('#tbl-contract-list').find('tr').removeClass('selected-row');

    }

});
