import Woowahan from "woowahan";
import template from "./added-ad-edit-view.hbs";
import {mapView} from "../commons/map/map-view";

export const addedAdEditView = Woowahan.PopupView.create('addedAdEditView', {
    template: template,
    mapView: mapView,
    events: {
        'click #btn-cancel': 'onClose',
        'click #btn-confirm': 'onConfirm',
        'click .close': 'onClose'
    },

    initialize(model) {
        this.setModel(model);
        this.setModel({shop: model.shop, editOnlyAdList: false, editEnableNewIcon: false});
        this.super();
    },

    viewDidMount()
    {
        this.renderAd();
    },

    getAd() {
        return this.getModel('addedAd');
    },
    getShop() {
        return this.getModel('shop');
    },
    renderAd() {
        let addedAd = this.getAd();
        console.log('onRenderAd');
        console.log(addedAd);
        this.setModel({adSeq: addedAd.adSeq});
        this.renderShopForm(addedAd.shop);
        this.renderAddress(addedAd.address, addedAd.latitude, addedAd.longitude);
        this.setModel({adShopName: addedAd.adShopName});
        this._changeCategorySelect(addedAd.categoryId);
    },

    renderShopForm(shop) {
        this.setModel(
            {
                shop: shop,
                shopId: shop.shopId,
                shopName: shop.shopName,
                shopMenuCategoryName: shop.shopMenuCategoryName,
                adShopName: shop.shopName,
                address: shop.address
            }
        );
    },

    renderAddress(address, latitude, longitude) {

        this.setModel({
            fullTextJibun: address,
            latitude: latitude,
            longitude: longitude
        });
        this.updateView(".edit-map-wrapper", this.mapView, {mapDivId:"additional-map" ,mapTypeId:"additional-map", latitude: latitude, longitude: longitude});
    },

    _changeCategorySelect(categoryCode) {
        this.$('#editCategoryId').val(categoryCode);
    },

    onEdit() {
        var editAd = this._serializeAdForm();
        const shop = editAd.shop;
        editAd.adSeq = adSeq;

        let adList = this.adListOfShopMap.get(shop.shopId);
        var indexAtEditAd = adList.findIndex(ad => {
            return ad.adSeq === editAd.adSeq
        });
        editAd.idx = indexAtEditAd + 1;
        adList[indexAtEditAd] = editAd;
        this.adListOfShopMap.set(shop.shopId, adList);
        this.reloadReqAds(shop);
    },
    _serializeAdForm() {
        var shop = this.getShop();
        return {
            adSeq: this.getAd().adSeq,
            shop: shop,
            adShopName: this.$('#editAdShopName').val(),
            adMenuCategoryId: this.$('#editAdShopMenuCategoryId').val(),
            adMenuCategoryName: this.$('#editAdShopMenuCategoryId option:selected').text(),
            address: this.$('#editAddress').val(),
            latitude: parseFloat(this.$('#editLatitude').val()),
            longitude: parseFloat(this.$('#editLongitude').val()),
            shopAdKindId: this.$('#editShopAdKindId').val(),
            shopAdKind: this.$('#editShopAdKindId option:selected').text(),
            adPrice: this.getAdPrice(this.$('#editShopAdKindId').val(), this.getModel('shopAdKinds'))

        };
    },

    getAdPrice(shopAdKindId, shopAdKinds){
        let adPrice = 0;
        if (!!shopAdKindId) {
            var selectedAdKinds = shopAdKinds.filter((v) => {
                return v.id === parseInt(shopAdKindId);
            });
            if (selectedAdKinds.length > 0) {
                adPrice = selectedAdKinds[0].price;
            }
        }
        return adPrice;
    },
    
    onClose() { 
        console.log('adEditView onclose');
        let data = {}; 
        data.confirm = false;
        this.closePopup(data);
    },

    onConfirm() {
        var data = {};
        var editedAd = this._serializeAdForm();
        data.editedAd = editedAd;
        data.confirm = true;
        this.closePopup(data);
    }



});