import Woowahan from 'woowahan';
import template from './shop-manage-popup.hbs'
import {addedShopListView} from './added-shop-list-view';
import {shopSearchView} from '../commons/shop/shop-search';
import {GET_SHOP_LIST, GET_SHOP} from "../../actions/index";

export const shopManagePopupView = Woowahan.PopupView.create('shopManagePopupView', {
    template: template,
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

    events: {
        'keyup #shopName': 'searchShop',
        '@changeShopSelected': 'onChangeShopSelected',
        'click #btn-clear-search-condition': 'onClickClearSearchCondition',
        'click #btn-delete': 'onClickDelete',
        '@restoreChecked': 'onRestoreChecked',
        'click #btn-add-shop': 'onAddShop',
        'click #btn-cancel': 'onConfirm',
        'click #btn-save': 'onConfirm'
    },

    initialize(model) {
        console.log('shopManagePopupView>initialize>>' + JSON.stringify(model));
        this.setModel(model);
        this.super();
        this.checkedShops = [];
        this.deletedShops = [];
    },

    viewDidMount() {
        this.addView('.added-shop-list-wrapper', addedShopListView, this.getModel());
        this.addView('.shop-list-wrapper', shopSearchView, this.getModel());
        $('#btn-shop-search').click();

        let top = $(window).scrollTop(),
            left = $(window).scrollLeft(),
            height = 500;

        $('.popup').css({
            top: 'calc(50% + ' + top + 'px)',
            left: 'calc(50% + ' + left + 'px)',
            height: height + 'px'
        });

        this.dispatch(Woowahan.Action.create(GET_SHOP_LIST, {shopOwnerId: this.getShopOwner().shopOwnerId}), this.updateShopList);
    },
    updateShopList(shopList) {
        console.log('updateShopList');
        this.setModel({shops: shopList});
    },
    getShopOwner() {
        return this.getModel("shopOwner");
    },
    searchShop() {
        let shopName = $('#shopName').val();

        var searchedShops = this.getAddedShops().filter(function (shop) {
            return shop.shopName.includes(shopName);
        });
        console.log(`searchShop:${shopName}`);
        console.log(searchedShops);
        this.reload(searchedShops);


    },
    reload(shops) {
        let shopName = $('#shopName').val();
        this.addView('.added-shop-list-wrapper', addedShopListView, {addedShops: shops, shopName: shopName});
        this.onRestoreChecked();
        this.checkedShops = [];
    },
    onChangeShopSelected(changedShop) {
        console.log('onChangeShopSelected>>' + JSON.stringify(changedShop));
        var indexOfChangedShop = this.checkedShops.findIndex(shop => {
            return shop.shopId === changedShop.shopId;
        });


        if (!changedShop.checked && indexOfChangedShop > -1) {
            this.checkedShops.splice(indexOfChangedShop, 1);
        }

        if (indexOfChangedShop > -1) {
            this.checkedShops[indexOfChangedShop] = changedShop;
            return;
        }
        console.log('pushonChangeShopSelected');
        this.checkedShops.push(changedShop);
        console.log(this.checkedShops);

    },
    getAddedShops() {
        return this.getModel('addedShops');
    },
    onClickClearSearchCondition() {
        this.reload(this.getAddedShops());
    },

    onRestoreChecked() {
        let _this = this;

        $('#tbl-added-shops').find("input[name=shopId]").each(function () {
            let compare = {};
            let $elem = $(this);
            compare.shopId = $elem.prop('value');

            var indexOfCheckedShop = _this.checkedShops.findIndex(shop => {
                console.log(`compareId:${compare.shopId}`);
                return parseInt(shop.shopId) === parseInt(compare.shopId);
            });

            console.log(`restoreChecked:${indexOfCheckedShop}, shopId:${compare.shopId}`);
            if (indexOfCheckedShop > -1) {
                $elem.click();
            }
        });

    },

    onClickDelete() {
        console.log('onClickDelete');
        this.deleteShops();

    },
    deleteShops() {
        let deleteShops = this.checkedShops;
        var _this = this;


        deleteShops.forEach(e => {
                let index = _this.getAddedShops().findIndex(s => {
                    return parseInt(s.shopId) === parseInt(e.shopId)
                });
                let shops = _this.getAddedShops();

                console.log(`deleteShops:${index}`);
                if (index > -1) {
                    _this.fireShopDelete(shops[index]);
                    _this.getAddedShops().splice(index, 1);
                }
            }
        );
        this.reassignIdx();
        this.reload(this.getAddedShops());
    },
    fireShopDelete(shop) {
        console.log('fireShopDeleted');
        this.deletedShops.push(shop);
    },

    onAddShop() {
        console.log('onAddShop');
        let _this = this;
        $('.shop-list-wrapper').find('input[name=shopId]').each(function() {
            let shopId = $(this).val();
            console.log('checked:'+ shopId);
            if (!!shopId && $(this).prop('checked') === true) {
                _this.dispatch(Woowahan.Action.create(GET_SHOP, {shopId: shopId}), _this.afterGetShop);
            }
        });
    },


    afterGetShop(shop) {
        console.log('afterGetShop');
        shop.shopId = shop.shopNo;
        let index = this.getAddedShops().findIndex(e => {
            console.log(`e:${e.shopId} shop:${shop.shopId}`);
            return parseInt(e.shopId) === parseInt(shop.shopNo);
        });


        console.log(`index:${index}`);

        if (index > -1) {
            return;
        }

        this.getAddedShops().push(shop);
        this.reassignIdx();
        this.reload(this.getAddedShops());
        this.onRestoreChecked();
        this.dispatch(Woowahan.Event.create('addedShop', {shop: shop}));

    },

    reassignIdx() {
        let _this = this;
        let shops = this.getAddedShops();
        shops.forEach(function (shop, index, collection) {
            shop.idx = index + 1;
            _this.getAddedShops()[index] = shop;
        });
        this.addedShops = shops;
        this.setModel({addedShops: shops});
    },

    onCancel() {
        let data = {};
        data.confirm = false;
        this.closePopup(data);
    },
    onConfirm() {
        let data = {};
        data.confirm = true;
        data.addedShops = this.getAddedShops();
        data.deletedShops = this.deletedShops;
        this.closePopup(data);
    }
});