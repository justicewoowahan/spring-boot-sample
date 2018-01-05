import Woowahan from "woowahan";
import template from "./shopad-list.hbs";
import {GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST} from "../../../actions/shopad-deal-detail";
import { PUT_APPROVE_SHOPAD, PUT_REJECT_SHOPAD ,PUT_CANCEL_SHOPAD } from "../../../actions/index";
import {simplePopupView} from "../../commons/popup/simple-popup-view";
import { shopAdDealStatusControlHelper} from "./shopad-deal-statuses-control-helper";

export default Woowahan.View.create('requestedShopAdListView', {
    template: template,
    events: {
        'click .btn-approve': 'onClickApprove',
        'click .btn-reject': 'onClickReject',
        'click .btn-cancel': 'onClickCancel',
    },
    simplePopupCss: {
        overflowY: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80%',
        maxHeight: '220px',
        background: '#fff',
        webkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)'
    },
    initialize(data) {
        this.setModel(data);
        this.super();
        this.setModel(shopAdDealStatusControlHelper.getVisibles(null));
        const shopAdDealId = this.getModel('shopAdDealId');
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST, {body: {shopAdDealId: shopAdDealId}}), this.onLoadView);
    },

    viewDidMount() {
    },

    onLoadView(shopAdDealDetailResponse) {

        console.log("shopad-list.onLoadView");
        console.log(JSON.stringify(shopAdDealDetailResponse));

        var shopAds = [];
        var totalPrice = 0;
        shopAdDealDetailResponse.shopAds.forEach(shopAd => {
                totalPrice += shopAd.shopAdKind.price;
                shopAds.push({
                    shopAdId: shopAd.shopAdId,
                    shopName: shopAd.shopName,
                    shopCategoryMenuName: shopAd.categoryName,
                    address: shopAd.address,
                    shopAdKindName: shopAd.shopAdKind.name,
                    price: shopAd.shopAdKind.price
                });
            }
        );


        this.setModel(
            {
                shopads: shopAds,
                comment: shopAdDealDetailResponse.comment,
                totalPrice: totalPrice
            }
        );
        console.log(shopAdDealStatusControlHelper.getVisibles(shopAdDealDetailResponse.status));
        this.setModel(shopAdDealStatusControlHelper.getVisibles(shopAdDealDetailResponse.status.value));
        this.updateView();
    },

    onClickApprove(e) {
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 승인',
            desc: '등록된 광고를 승인 하시겠습니까?'
        }, function (result) {
            if (result.confirm) {
                const shopAdDealId = this.getModel('shopAdDealId');
                this.dispatch(Woowahan.Action.create(PUT_APPROVE_SHOPAD, {id : shopAdDealId}), this.afterApproved);
            }
        });
    },

    afterApproved(data) {
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 승인 완료',
            desc: '승인이 완료 되었습니다'
        }, function (result) {
            if (result.confirm) {
                window.location.reload();
            }
        });

    },

    onClickReject() {
        var _this = this;

        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 반려',
            desc: '등록된 광고를 반려 하시겠습니까?'
        }, function (result) {
            if (result.confirm) {
                const shopAdDealId = this.getModel('shopAdDealId');
                this.dispatch(Woowahan.Action.create(PUT_REJECT_SHOPAD, {id : shopAdDealId}), this.afterReject);
            }
        });
    },

    afterReject(data) {
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 반려 완료',
            desc: '반려 완료 되었습니다'
        }, function (result) {
            if (result.confirm) {
                window.location.reload();
            }
        });

    },

    onClickCancel() {
        var _this = this;

        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 취소',
            desc: '등록된 광고를 취소 하시겠습니까?'
        }, function (result) {
            if (result.confirm) {
                const shopAdDealId = this.getModel('shopAdDealId');
                this.dispatch(Woowahan.Action.create(PUT_CANCEL_SHOPAD, {id : shopAdDealId}), this.afterCancel);
            }
        });
    },

    afterCancel(data) {
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고리스트 취소 완료',
            desc: '취소 완료 되었습니다'
        }, function (result) {
            if (result.confirm) {
                window.location.reload();
            }
        });

    },

});

