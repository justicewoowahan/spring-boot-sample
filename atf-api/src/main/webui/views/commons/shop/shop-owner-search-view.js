import Woowahan from "woowahan";
import template from "./shop-owner-search-view.hbs";
import {shopOwnerCollectionView} from "./shop-owner-collection-view";

export const shopOwnerSearchView = Woowahan.View.create('shopOwnerSearchView' , {
    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #close': 'onCancel',
        'click .close': 'onCancel',
        '@shopOwnerChecked': 'onSubmit'
    },
    
    initialize(model) { 
        this.setModel(model); 
        this.super();
    },

    viewDidMount()
    {

        this.addView('#shop-owner-search-wrapper', shopOwnerCollectionView);
        let top = $(window).scrollTop(),
            left = $(window).scrollLeft(),
            height = 500;

        $('.popup').css({
            top: 'calc(50% + ' + top + 'px)',
            left: 'calc(50% + ' + left + 'px)',
            height: height + 'px'
        });

    },

    onConfirm() {

    },

    _getMode() {
        return this.getModel().mode;
    },

    onSubmit(shop) {
        this.dispatch(Woowahan.Event.create('selectedShopOwner', shop));
    },
    onCancel() {
        this.dispatch(Woowahan.Event.create('popupClose'));
    }
});
