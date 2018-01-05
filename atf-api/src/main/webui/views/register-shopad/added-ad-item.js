import Woowahan from "woowahan";
import template from './added-ad-item.hbs';

export const addedAdItem  = Woowahan.ItemView.create('addedAdItem', {
    template: template,
    events: {
        'click .delete-req-ad': 'onClickDeleteAd',
        'click .edit-req-ad': 'onClickEditAd'
    },

    onSelectedRow(event, trigger) {
        // trigger(this.getModel());
    },

    onClickEditAd(e) {
        this.dispatch(Woowahan.Event.create('clickEditAd', this.getModel()));
    },

    onClickDeleteAd(e) {
        this.dispatch(Woowahan.Event.create('clickDeleteAd', this.getModel()));
    }
});
