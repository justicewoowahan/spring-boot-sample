import Woowahan from 'woowahan';
import template from './shop-combine-view.hbs'
import { shopOwnerSearchView } from "./shop-owner-search-view";
import { shopSearchView } from "./shop-search";
import {simplePopupView} from "../../commons/popup/simple-popup-view";
import {popupUtils} from "../../commons/utils/popup-util.js";

export const shopCombineView = Woowahan.PopupView.create('shopCombineView', {
    template: template,
    SHOP_SEARCH: 'SHOP_SEARCH',
    SHOP_OWNER_SEARCH:'SHOP_OWNER_SEARCH',

    events: {
        'keyup .search-text': 'onKeyupShop',
        'click #btn-search': 'onClickSearch',
        '@selectedShopOwner' : 'onSelectedShopOwner',
        '@selectedShop' : 'onSelectedShop',
        '@selectedComplete': 'onSelectedComplete',
        '@popupClose': 'onCancel',
        'click #btn-cancel': 'onCancel',
        '@goPrevious': 'onGoPrev',
        '@changeSelectedShop': 'onChangeSelectedShop',
        'click #btn-save': 'onComplete',
    },
    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        this._loadShopOwnerSearchView();
    },

    onSelectedShopOwner(shopOwner) {
        console.log(`shopOwner:${shopOwner}`);
        this.setModel({shopOwner: shopOwner});
        this._loadShopSearchView(shopOwner);
    },

    _loadShopOwnerSearchView() {
        this.setModel({MODE : this.SHOP_OWNER_SEARCH});
        this.addView('.shop-popup-container', shopOwnerSearchView, this.getModel());
    },

    _loadShopSearchView(shopOwner) {
        this.setModel({MODE : this.SHOP_SEARCH});
        this.addView('.shop-popup-container', shopSearchView, {mode: 'COMBINE', shopOwner: shopOwner});
    },


    onSelectedComplete(model) {
        this.onSubmit(model.selectedShops);
    },
    onSubmit(selectedShops) {

        console.log('selectedShops>>>>');
        console.log(selectedShops);
        var data = {};
        data.confirm = true;
        const shopOwner = this.getModel('shopOwner');
        let shopOwnerString = JSON.stringify(shopOwner);
        console.log(`shopOwner>>>>:${shopOwnerString}`);


        if (!selectedShops || selectedShops.length <= 0) {
            alert("업소를 선택하지 않았습니다.<br/>광고를 등록할 업소를 선택해주세요.");
            // this.addPopup(simplePopupView, popupUtils.createPopupOption("알림", "업소를 선택하지 않았습니다.<br/>광고를 등록할 업소를 선택해주세요."), function(result){});
            return;
        }

        data.selectedShops = selectedShops.map(shop => {
            shop.shopOwner = shopOwner;
            return shop;
        });
        data.shopOwner = shopOwner;

        console.log(data.selectedShops);
        this.closePopup(data);
        return true;
    },
    onComplete() {
        const mode = this.getModel('MODE');
        switch(mode) {
            case this.SHOP_SEARCH:
                this.onSelectedShopComplete();
                break;
            case this.SHOP_OWNER_SEARCH:
                this.onSelectedOwnerComplete();
                break;
            default:
                throw Error(`mode:${mode} does not support!`);
        }
    },
    onSelectedShopComplete() {
        const shopOwner = this.getModel('shopOwner');
        var data = {};
        data.confirm = true;
        data.selectedShops = this.getModel('selectedShops');
        data.shopOwner = shopOwner;

        data.selectedShops.map( shop => shop.shopOwner= shopOwner);
        this.closePopup(data);
        return true;
    },
    onSelectedOwnerComplete() {

    },
    onCancel() {
        var data = {};
        data.confirm = false;
        this.closePopup(data);
    },

    onChangeSelectedShop(model) {
        this.setModel({selectedShops: model.selectedShops});
    },

    onGoPrev() {
        this._loadShopOwnerSearchView();
    }

});