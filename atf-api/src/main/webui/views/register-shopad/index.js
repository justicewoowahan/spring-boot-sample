import Woowahan from "woowahan";
import template from "./index.hbs";
import {addressSearchView} from "../commons/address/address-search";
import {shopSearchView} from "../commons/shop/shop-search";
import {mapView} from "../commons/map/map-view";
import {paymentMethodRegisterView} from "../commons/payment/payment-method-register-popup";
import {addedAdListView} from "./added-ad-list-view";
import {paymentMethodUtil} from "../commons/utils/payment-methods-util";
import {contractListView} from "../commons/contract/contract-list-view";
import {shopCombineView} from "../commons/shop/shop-combine-view";
import {simplePopupView} from "../commons/popup/simple-popup-view";
import {popupUtils} from "../commons/utils/popup-util.js";
import {shopManagePopupView} from "./shop-manage-popup-view";

import {
    GET_ADDRESS_JUSO,
    GET_SHOPAD_FORM,
    POST_ADDRESS_SELECT,
    GET_PAYMENT_METHOD_LIST_OF_SHOP_OWNER
} from '../../actions/index';
import {POST_SHOPAD} from "../../actions/shopad";
import {sequenceGenerator} from "../commons/utils/sequence-generator";

export const adRegistrationView = Woowahan.View.create('adRegistrationView', {
    template: template,
    mapView: mapView,
    events: {
        'click #btn-search-address': 'onSearchAddress',
        'click #btn-search-shop': 'onSearchShop',
        'click #btn-add-req-list': 'onAddRequestList',
        'click #btn-edit': 'onReqAdEdit',
        'click #btn-init': 'onInit',
        'click #btn-submit-shopad': 'onSubmitShopAd',
        '@onChangedAddress': 'onChangedAddress',
        '@editAd': 'onSelectedReqAd',
        '@changedAddedAds': 'onChangedAddedAds',
        'click #btn-register-payment': 'onRegisterPayment',
        'click #btn-search-contract': 'onSearchContract',
        'click #btn-search-shop-owner': 'onSearchShopOwner',
        '@selectedShopChanged': 'onSelectedShopChanged',
        '@shopDeleted': 'onShopDeleted',
        '@removeAllOfShop': 'onRemoveAllOfShop',
        '@deleteReqAd': 'onDeleteReqAd',
        'change #shopList': 'onChangeAddedShops',
        'click #btn-shop-manage': 'onClickShopManage',
        '@addedShop': 'onAddedShop'
        // '@deleteShops': 'onDeleteShops'
    },

    defaultCss: {
        overflowY: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '60%',
        maxHeight: '410px',
        background: '#fff',
        webkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)'
    },

    EDIT_MODE: 'EDIT',

    initialize() {
        this.id = 0;
        this.addedAds = [];
        this.adListOfShopMap = new Map();
        this.adSequenceGenerator = new sequenceGenerator();
        this.resizeFullOfBottom = false;

        this.setModel({
            fullTextJibun: '',
            latitude: '',
            longitude: '',
            shopMenuCategory: '',
            adShopName: '',
            totalAdPrice: '0원',
            mode: 'add',
            adminComment: ''
        });
        this.super();
    },

    viewDidMount() {
        this.setAddedShops([]);
        this.setModel({adStartDate: ''})
    },

    onSubmitShopAd() {
        console.log('onSubmitShopAd');
        console.log(JSON.stringify(this.getModel()));

        let shopId = this.getModel().shopId;
        let shopOwnerId = this.getModel().shopOwner.shopOwnerId;
        let withdrawalDateId = this.$('input[name=withdrawalDateId]:checked').val();
        let paymentMethodId = this.$('#paymentMethodId option:selected').val();
        let adStartDate = this.$('#adStartDate').val();
        let useQuickAd = this.$('input[name=useQuickAd]:checked').is(":checked");
        let adminComment = this.getModel().adminComment;
        let requestParams = new Array();

        if (adStartDate == null || adStartDate === '') {
            this.alertPopup('확인','광고 신청일이 선택되지 않았습니다');
            return;
        }
        console.log(`onSubmitShopAd adStartDate:${adStartDate}`);
        this.adListOfShopMap.forEach(function (adList, key, map) {
            adList.forEach(function (addedAd, index, collection) {
                requestParams.push(
                    {
                        shopId: shopId,
                        shopOwnerId: shopOwnerId,
                        categoryId: parseInt(addedAd.adMenuCategoryId),
                        shopName: addedAd.adShopName,
                        address: addedAd.address,
                        latitude: parseFloat(addedAd.latitude),
                        longitude: parseFloat(addedAd.longitude),
                        adStartDate: adStartDate,
                        useQuickAd: useQuickAd,
                        shopAdKindId: addedAd.shopAdKindId,
                        paymentMethodId: paymentMethodId,
                        withdrawalDateId: withdrawalDateId
                    });
            });

        });


        let requestBody = {
            comment: adminComment,
            shopAdRegistrations: requestParams
        };

        console.log(JSON.stringify(requestBody));

        this.dispatch(Woowahan.Action.create(POST_SHOPAD, {body: requestBody}), this.onShopAd);
    },

    onShopAd(shopAdRegistrationResponse) {
        console.log('onShopAd');
        location.reload();
    },

    onChangedAddress(address) {
        console.log('onAddressConversion!!');
        console.log(`onAddressConversion = ${address.detail}, ${address.fullTextJibun}`);
        this.setModel({
            fullTextJibun: address.fullTextJibun,
            latitude: address.latitude,
            longitude: address.longtitude
        });
    },

    searchAddress(data) {

        if (!data.content || data.content.length === 0) {
            this.alertPopup('확인', '주소를 찾을 수 없습니다');
            return;
        }

        const juso = data.content[0];

        this.dispatch(Woowahan.Action.create(POST_ADDRESS_SELECT, {
            jusoDetailRequest: juso,
            detail: ''
        }), this.resolveAddress);
    },

    resolveAddress(selectedAddress) {
        this.renderAddress(selectedAddress.fullTextJibun, selectedAddress.latitude, selectedAddress.longtitude);
    },

    renderAddress(address, latitude, longitude) {

        this.setModel({
            fullTextJibun: address,
            latitude: latitude,
            longitude: longitude
        });
        this.updateView(".map-wrapper", this.mapView, {latitude: latitude, longitude: longitude});
    },

    renderShopForm(shop) {
        console.log(shop);

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

    onSearchShop() {
        var _this = this;

        this.defaultCss.width = '60%';
        this.addPopup(shopSearchView, {
            useDefaultCss: false,
            css: _this.defaultCss
        }, function (result) {
            if (result.confirm) {
                let selectedShop = result.shop;
                _this.setModel({shop: selectedShop});
                _this.onInit();
            }
        });
    },

    onSearchAddress() {
        var _this = this;
        this.defaultCss.width = '60%';

        this.addPopup(addressSearchView, {
            useDefaultCss: false,
            css: _this.defaultCss
        }, function (result) {
            if (result.confirm) {
                _this.resolveAddress(result.selectedAddress);
            }
        });
    },

    renderShopAdForm(data) {
        const searchedShopMenuCategory = this._getCurrentShop().shopMenuCategoryId;

        data.shopAdKindsList = data.shopAdKinds.map(shopKind => ({label: shopKind.name, value: shopKind.id}));
        data.withdrawalDates = data.withdrawalDates.map(withdrawalDate => ( {
            label: `${withdrawalDate.day}일`,
            value: withdrawalDate.id,
            name: 'withdrawalDateId'
        } ));
        data.paymentMethods = paymentMethodUtil.mapToOption(data.paymentMethods);

        data.adShopMenuCategoryName = data.shopMenuCategories.map(selectableShopMenuCategory => {
            let selected = false;
            if (searchedShopMenuCategory === selectableShopMenuCategory.code) {
                selected = true;
            }
            return {
                label: selectableShopMenuCategory.codeName,
                value: selectableShopMenuCategory.code,
                selected: selected
            };
        });

        this.setModel(data);
    },

    _serializeAdForm() {
        return {
            adShopName: this.$('#adShopName').val(),
            adMenuCategoryId: this.$('#adShopMenuCategoryId').val(),
            adMenuCategoryName: this.$('#adShopMenuCategoryId option:selected').text(),
            address: this.$('#address').val(),
            latitude: parseFloat(this.$('#latitude').val()),
            longitude: parseFloat(this.$('#longitude').val()),
            shopAdKindId: this.$('#shopAdKindId').val(),
            shopAdKind: this.$('#shopAdKindId option:selected').text(),
            adPrice: this.getAdPrice(this.$('#shopAdKindId').val(), this.getModel('shopAdKinds'))
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

    onAddRequestList() {
        let shop = this._getCurrentShop();
        let reqAd = this._serializeAdForm();
        var addedAd = this._addReqAdIfNotExists(reqAd);
        shop = this._addShopIfNotExists(shop);
        this.addShopAdToShop(shop, addedAd);
        this._reloadReqAds(shop);
    },
    addShopAdToShop(shop, addedAd) {
        var shopAds = this.adListOfShopMap.get(shop.shopId) || new Array();
        shopAds.push(addedAd);
        this.adListOfShopMap.set(shop.shopId, shopAds);
    },
    getAddedShops() {
        return this.getModel('addedShops') || [];
    },
    setAddedShops(addedShops) {
        let shops = addedShops.map(shop => (
            {label: `${shop.shopName} (${shop.shopId})`, value: shop.shopId}
        ));

        if (shops.length == 0){
            shops = [{label: '선택된 업소가 존재하지 않습니다', value: ''}];
        }
        console.log('onSetAddedShops>>' + JSON.stringify(shops));
        console.log('onSetAddedShops2>>' + JSON.stringify(addedShops));
        this.setModel({addedShops: addedShops, shopList: shops});
    },
    _addShopIfNotExists(shop) {

        let addedShops = this.getAddedShops();
        var alreadyAddedShop = addedShops.filter((v) => {
            return v.shopId === shop.shopId;
        });

        if (!!alreadyAddedShop && alreadyAddedShop.length > 0) {
            console.log(`alreadyAddedShop:${alreadyAddedShop}`);
            return alreadyAddedShop[0];
        }

        console.log(`addshop:` + JSON.stringify(shop));
        shop.idx = addedShops.length + 1;
        addedShops.push(shop);
        this.setAddedShops(addedShops);
        return shop;
    },

    _addReqAdIfNotExists(reqAd) {
        reqAd.adSeq = this.adSequenceGenerator.increaseAndGet();
        reqAd.shop = reqAd.shop;
        return reqAd;
    },

    _rebuildIndexAndCalcPricesOfShop(shop) {

        var adListOfShop = this.adListOfShopMap.get(shop.shopId);
        if (!adListOfShop || adListOfShop.length === 0) {
            return;
        }

        let totalPrice = adListOfShop
            .map(function (ad) {
                return ad.adPrice;
            }).reduce((prev, curr) => prev + curr, 0);


        this.setModel(
            {
                adListOfShopMap: this.adListOfShopMap,
                totalAdPriceOfShop: `${totalPrice}원`
            }
        );


    },

    _rebuildIndexAndCalcPrice() {
        let addedShops = this.getAddedShops();
        let totalAdPrice = 0;
        let totalAdCount = 0;
        let totalQuickAdPrice = 0;
        this.adListOfShopMap.forEach(function (adList, key, map) {
            adList.forEach(function (ad, index, collection) {
                adList[index].idx = index + 1;
                totalAdCount++;
            });

            totalAdPrice = adList.map(function (ad) {
                return ad.adPrice;
            }).reduce((prev, curr) => prev + curr, 0);
        });
        this.setModel(
            {
                shopCount: `${addedShops.length}개`,
                adListOfShopMap: this.adListOfShopMap,
                totalAdCount: `${totalAdCount}개`,
                totalAdPrice: `${totalAdPrice}원`,
                totalQuickAdPrice: `${totalAdPrice}원`,
            }
        );
    },


    _reloadReqAds(shop) {
        this._rebuildIndexAndCalcPricesOfShop(shop);
        this._rebuildIndexAndCalcPrice();
        let adListOfShop = this.adListOfShopMap.get(shop.shopId);
        this.updateView("#added-ads-wrapper", addedAdListView, {addedAds: adListOfShop, shopId: shop.shopId});
    },

    onSelectedReqAd(addedAd) {
        console.log('onSelectedReqAd');
        console.log(addedAd);
        this.setModel({mode: this.EDIT_MODE, adSeq: addedAd.adSeq});
        this.renderShopForm(addedAd.shop);
        this.renderAddress(addedAd.address, addedAd.latitude, addedAd.longitude);
        this.setModel({adShopName: addedAd.adShopName});
        this._changeCategorySelect(addedAd.categoryId);
    },


    onInit() {
        const shop = this._getCurrentShop();

        if (shop == null) {
            return;
        }
        this.renderShopForm(shop);
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_FORM, {shopOwnerId: shop.shopOwner.shopOwnerId}), this.renderShopAdForm);
        this.dispatch(Woowahan.Action.create(GET_ADDRESS_JUSO, {search: shop.address}), this.searchAddress);
        this.setModel({adShopName: shop.shopName});
        this._changeCategorySelect(shop.shopMenuCategoryCode);

    },

    _changeCategorySelect(categoryCode) {
        this.$('#categoryId').val(categoryCode);
    },

    _changeShopAdKindId(shopAdKindId) {
        this.$('#shopAdKindId').val(shopAdKindId);
    },


    onReqAdEdit() {
        const mode = this.getModel('mode');
        console.log(`mode:${mode}`);

        if (mode !== this.EDIT_MODE) {
            this.alertPopup('확인', '수정할 광고가 존재하지 않습니다');
            return;
        }

        const adSeq = this.getModel('adSeq');
        var editAd = this._serializeAdForm();
        editAd.adSeq = adSeq;
        var indexAtEditAd = this.addedAds.findIndex(ad => {
            return ad.adSeq === editAd.adSeq
        });
        editAd.idx = indexAtEditAd + 1;
        this.addedAds[indexAtEditAd] = editAd;
        this._reloadReqAds();
    },

    onChangedAddedAds(model) {
        this._reloadReqAds();
    },
    onRegisterPayment() {
        var _this = this;

        const shopOwner = this._getShopOwner()

        console.log('onRegisterPayment');
        this.defaultCss.width = '50%';
        this.addPopup(paymentMethodRegisterView, {
            shopOwnerId: shopOwner.shopOwnerId,
            useDefaultCss: false,
            css: _this.defaultCss
        }, function (result) {
            if (result.confirm) {
                _this.loadPaymentMethodList();
            }

        });
    },

    loadPaymentMethodList() {
        const shopOwnerId = this.getModel().shopOwner.shopOwnerId;
        console.log(`loadPaymentMethodList:${shopOwnerId}`);
        this.dispatch(Woowahan.Action.create(GET_PAYMENT_METHOD_LIST_OF_SHOP_OWNER, {shopOwnerId: shopOwnerId}), this.onPaymentMethods);
    },

    onPaymentMethods(data) {
        let paymentMethods = data.paymentMethods = paymentMethodUtil.mapToOption(data);
        this.setModel({paymentMethods: paymentMethods});
    },

    onSearchContract() {
        let shopOwner = this._getShopOwner();

        if (shopOwner == null) {
            return;
        }

        var _this = this;

        this.defaultCss.width = '60%';
        this.addPopup(contractListView, {
            shopOwner: shopOwner,
            useDefaultCss: false,
            css: _this.defaultCss
        }, function (result) {
            if (result.confirm) {
                var contractJson = JSON.stringify(result.contract);
                console.log(`selectedContract:${contractJson}`)
                _this.setModel({contract: result.contract});
                _this.onInit();
            }
        });
    },

    setShopOwner(model) {
        let shopOwner = model.shopOwner;
        console.log(`setShopOwner:` + JSON.stringify(shopOwner));
        let currentShopOwner = this.getModel('shopOwner');

        if (currentShopOwner == null) {
            this.updateShopOwnerAndShopList(model);
            return;
        }

        let _this = this;
        if (currentShopOwner.shopOwnerId !== shopOwner.shopOwnerId) {
            this.addPopup(simplePopupView, popupUtils.createPopupOption('확인', `선택된 업소가 기존에 선택한 ${currentShopOwner.name}과 다릅니다. <br/>해당 업주를 선택하실 경우 기존에 신청 진행중인 광고목록은 삭제 됩니다.`),
                function (result) {
                    console.log('callback on shopOwner change popup' + JSON.stringify(result));
                    if (result.confirm) {
                        _this.clear();
                        _this.updateShopOwnerAndShopList(model);
                    }
                    return false;
                }
            );

        }

    },

    updateShopOwnerAndShopList(result) {

        let selectedShops = result.selectedShops;
        this.changedSelectedShops(selectedShops);
        this.setModel({
            currentShop: selectedShops[0],
            shopOwnerName: result.shopOwner.name,
            shopOwner: result.shopOwner,
            shopOwnerId: result.shopOwner.shopOwnerId
        });
        this.loadPaymentMethodList();
        this.onInit();
        console.log('addedShop>>' + JSON.stringify(this.getAddedShops()));
        console.log('adListOfMap>>' + JSON.stringify(this.adListOfShopMap));
    },

    clear() {
        this.setAddedShops([]);
        this.adListOfShopMap = new Map();
    },


    onSearchShopOwner() {
        var _this = this;

        this.defaultCss.width = '60%';
        this.addPopup(shopCombineView, {
            defaultCss: false,
            css: _this.defaultCss
        }, function (result) {
            if (result.confirm) {
                console.log('after select shop');
                console.log(result);
                _this.setShopOwner(result);


            }
        })
    },
    changedSelectedShops(selectedShops) {
        if (selectedShops == null || selectedShops.length === 0) {
            // this.alertPopup('확인', '선택된 업소가 없습니다.');
            return;
        }

        selectedShops.forEach(shop => this._addShopIfNotExists(shop));
        var selectedShopId = selectedShops[0].shopId;
        $(`#shop-item-${selectedShopId}`).click();
    },
    onChangeAddedShops(event) {
        var targetShop = {};
        let addedShops = this.getAddedShops();
        targetShop.shopId = $('#shopList').val();
        var indexOfShop = addedShops.findIndex(function (e) {
            return parseInt(e.shopId) === parseInt(targetShop.shopId);
        });

        if (indexOfShop == -1) {
            return;
        }

        let selectedShop = addedShops[indexOfShop];
        console.log('onChangeAddedShops>>' + JSON.stringify(selectedShop));
        this.onSelectedShopChanged(selectedShop);
    },
    onSelectedShopChanged(shop) {
        console.log('<<<onSelectedShopChanged>>>' + JSON.stringify(shop));
        this.setModel({currentShop: shop});
        this.onInit();
        this._reloadReqAds(shop);
    },
    deleteShops(deletedShops) {
        console.log('deleteShops');
        console.log(deletedShops);
        let _this = this;
        deletedShops.forEach(shop => {
            _this.onShopDeleted(shop)
        });
    },
    onShopDeleted(shop) {
        console.log(`shopDeleted`);
        console.log(shop);
        let addedShops = this.getAddedShops();
        this.adListOfShopMap.delete(shop.shopId);
        var indexOfShop = addedShops.findIndex(e => {
            return e.shopId === shop.shopId
        });

        if (indexOfShop === -1) {
            return;
        }
        addedShops.splice(indexOfShop, 1);
        this.loadDefaultShopAds();
        this.setAddedShops(addedShops);
        console.log(JSON.stringify(this.getAddedShops()));
    },
    loadDefaultShopAds() {
        this._clearReqAds();
        let addedShops = this.getAddedShops();

        if (addedShops.length > 0) {
            this._reloadReqAds(addedShops[0]);

        }
    },
    _clearReqAds() {
        let shop = this._getCurrentShop();
        this.adListOfShopMap.delete(shop.shopId);
        this.updateView("#added-ads-wrapper", addedAdListView, {addedAds: [], shopId: shop.shopId});
        this.initShopAdForm();
    },
    initShopAdForm() {
        let shopOwner = this._getShopOwner();
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_FORM, {shopOwnerId: shopOwner.shopOwnerId}), this.renderShopAdForm);
        // this.renderAddress(null, null, null);
        this.setModel(
            {
                shop: null,
                shopId: null,
                shopName: null,
                shopMenuCategoryName: null,
                adShopName: null,
                address: null
            }
        );
    },

    onRemoveAllOfShop(shopId) {
        this.adListOfShopMap.delete(shopId);
        this.loadDefaultShopAds();
    },

    _getFirstShop() {
        let addedShops = this.getAddedShops();
        if (!addedShops || addedShops.length === 0) {
            return null;
        }
        return addedShops[0];
    },

    _getCurrentShop() {
        var currentShop = this.getModel('currentShop');

        if (currentShop == null) {
            this.alertPopup('확인', '선택된 업소가 존재하지 않습니다');
            return;
        }

        return currentShop;

    },
    _getShopOwner() {
        var shopOwner = this.getModel('shopOwner');

        if (!shopOwner || shopOwner == null) {
            this.alertPopup('확인', '선택된 업주가 존재하지 않습니다');
            return;
        }
        return shopOwner;

    },
    alertPopup(title, desc, cb) {
        this.addPopup(simplePopupView, popupUtils.createPopupOption(title, desc), function (result) {
        });
    },
    onDeleteReqAd(model) {
        let ad = model.ad;
        var currentShop = this._getCurrentShop();
        let adList = this.adListOfShopMap.get(currentShop.shopId);

        let indexOfAd = adList.findIndex(function (e) {
            return e.adSeq === ad.adSeq;
        });
        console.log(`onDeleteReqAd:index:${indexOfAd}`);

        if (indexOfAd === -1) {
            return;
        }

        adList.splice(indexOfAd, 1);

        this.adListOfShopMap.set(currentShop.shopId, adList);
        this._reloadReqAds(currentShop);
    },

    onClickShopManage() {
        var _this = this;

        let shopOwner = this._getShopOwner();

        if (shopOwner == null) {
            return;
        }

        this.defaultCss.width = '60%';
        this.addPopup(shopManagePopupView, {
            defaultCss: false,
            css: _this.defaultCss,
            addedShops: _this.getAddedShops(),
            shopOwner: _this._getShopOwner()
        }, function (result) {
            if (result.confirm) {
                console.log('onClickShopManageConfirm');
                console.log(result.addedShops);
                _this.deleteShops(result.deletedShops);
                _this.changedSelectedShops(result.selectedShops);
            }
        })
    },

    onAddedShop(data) {
        this._addShopIfNotExists(data.shop);
    }

});
