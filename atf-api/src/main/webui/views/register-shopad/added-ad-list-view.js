import Woowahan from "woowahan";
import template from "./added-ad-list.hbs";
import {addedAdItem} from "./added-ad-item";
import {simplePopupView} from "../commons/popup/simple-popup-view";

export const addedAdListView = Woowahan.CollectionView.create('AddedAdListView', {
    template: template,
    rowView: addedAdItem,
    rowContainer: '#tbl-request-ads',

    events: {
        '@clickDeleteAd': 'onDeleteReqAd',
        '@clickEditAd': 'onClickEditAd',
        'click #btn-delete-all': 'onDeleteAllReqAd'
    },
    simplePopupCss: {
        overflowY: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '60%',
        maxHeight: '220px',
        background: '#fff',
        webkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)'
    },

    initialize(model) {
        this.setAndBindModel(model);
        this.super();
    },

    setAndBindModel(model) {
        this.setModel(model);
        this._bindModel();
    },



    viewDidMount() {
        console.log('viewDidMount in addedAdListView');
        console.log(this._getAddedAds());
        console.log(this.rowView);
        this.reload(this._getAddedAds());
    },

    onClickEditAd(addedAd) {
        console.log('onClickEditAd');
        console.log(addedAd);
        this.dispatch(Woowahan.Event.create('editAd', addedAd));
    },
    _getAddedAds() {
        return this.getModel('addedAds');
    },
    _setAddedAds(addedAds) {
        this.setAndBindModel({'addedAds':addedAds});
        this.reload(addedAds);
    },

    onDeleteReqAd(reqAd) {
        // this.simplePopupCss.width = '60%';
        const addedAds = this._getAddedAds();
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고 리스트 삭제',
            desc: '등록된 광고를 삭제하시겠습니까?'
        }, function (result) {
            if (result.confirm) {
                _this.dispatch(Woowahan.Event.create('deleteReqAd', {ad:reqAd}));
            }
        });
    },

    onDeleteAllReqAd() {
        // this.simplePopupCss.width = '60%';
        var _this = this;
        this.addPopup(simplePopupView, {
            useDefaultCss: false,
            css: _this.simplePopupCss,
            title: '광고 리스트 목록 전체 삭제',
            desc: '등록된 광고 신청 목록 전체를 삭제하시겠습니까?'
        }, function (result) {
            if (result.confirm) {
                _this.dispatch(Woowahan.Event.create('removeAllOfShop', {shopId: this.getModel("shopId")}));
            }
        });

    },


});