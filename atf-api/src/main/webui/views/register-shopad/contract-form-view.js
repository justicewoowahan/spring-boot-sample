import Woowahan from "woowahan";
import template from "./contract-form.hbs";
import {contractListView} from "../commons/contract/contract-list-view";
import {shopCombineView} from "../commons/shop/shop-combine-view";
import {simplePopupView} from "../commons/popup/simple-popup-view";
import {popupUtils} from "../commons/utils/popup-util.js";

export const contractFormView = Woowahan.View.create('contractFormView', {
    template: template,
    events: {
        'click #btn-search-contract': 'onSearchContract',
        'click #btn-search-shop-owner': 'onSearchShopOwner'
    },

    initialize(model) {
        this.setModel(model);
        this.setModel({existContract: 'hide'});
        this.super();
    },

    getShopOwner() {
        var shopOwner = this.getModel('shopOwner');

        if (!shopOwner || shopOwner == null) {
            this.addPopup(simplePopupView, popupUtils.createPopupOption('확인', '선택된 업주가 존재하지 않습니다'), function (result) {
            });
            return;
        }
        return shopOwner;

    },

    onSearchContract() {
        let shopOwner = this.getShopOwner();

        if (shopOwner == null) {
            return;
        }

        var _this = this;
        let popupCss = popupUtils.defaultPopupCss();
        popupCss.width = '60%';
        this.addPopup(contractListView, {
            shopOwner: shopOwner,
            useDefaultCss: false,
            css: popupCss
        }, function (result) {
            if (result.confirm) {
                _this.updateContract(result);
            }
        });
    },

    updateContract(result) {
        var contractJson = JSON.stringify(result);
        console.log(`selectedContract:${contractJson}`)


        var contract = {
            contract: result.contract,
            contractOfShopList: result.contractOfShopList,
            existContract: 'show'
        };
        this.setModel(contract);
        this.fireUpdateContract(contract);
    },

    fireUpdateContract(contract) {
        this.dispatch(Woowahan.Event.create('updatedContract', contract));
    },

    onSearchShopOwner() {

        let popupCss = popupUtils.defaultPopupCss();
        popupCss.width = '60%';

        var _this = this;


        this.addPopup(shopCombineView, {
            defaultCss: false,
            css: popupCss
        }, function (result) {
            if (result.confirm) {
                console.log('after select shop');
                console.log(result);

                _this.setShopOwner(result);

            }
        })
    },

    setShopOwner(result) {
        this.setModel({
            shopOwner: result.shopOwner,
            shopOwnerName: result.shopOwner.name,
            shopOwnerId: result.shopOwner.shopOwnerId
        });
        this.fireUpdateShopOwner(result);
    },

    fireUpdateShopOwner(result) {

        if (result == null) {

        }

        console.log(`onFireUpdateShopOwner=>` + JSON.stringify(result));
        this.dispatch(Woowahan.Event.create('updatedShopOwner', result));
    }

});