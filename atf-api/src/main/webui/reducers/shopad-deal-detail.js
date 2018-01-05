import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';

import {
    GET_SHOPAD_DEAL,
    GET_SHOPAD_DEAL_DETAIL_CONTRACT,
    GET_SHOPAD_DEAL_DETAIL_DEAL,
    GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST,
    GET_SHOPAD_DEAL_LIST,
    GET_SHOPAD_DEAL_LIST_INIT,
    PUT_APPROVE_SHOPAD,
    PUT_REJECT_SHOPAD,
    PUT_CANCEL_SHOPAD
} from '../actions/shopad-deal-detail';

export const GetShopAdDealListInit = Woowahan.Reducer.create(GET_SHOPAD_DEAL_LIST_INIT, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals/init`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});


export const GetShopAdDealList = Woowahan.Reducer.create(GET_SHOPAD_DEAL_LIST, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals`, {data: data, contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});


export const GetShopAdDeal = Woowahan.Reducer.create(GET_SHOPAD_DEAL, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals/${data.id}`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});

export const GetShopAdDealDetailContract = Woowahan.Reducer.create(GET_SHOPAD_DEAL_DETAIL_CONTRACT, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals/${data.body.shopAdDealId}/shop`, {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    });
});

export const GetShopAdDealDetailDeal = Woowahan.Reducer.create(GET_SHOPAD_DEAL_DETAIL_DEAL, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals/${data.body.shopAdDealId}/deal`, {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    });
});

export const GetShopAdDealDetailShopAdList = Woowahan.Reducer.create(GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shopad/deals/${data.body.shopAdDealId}`, {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    });
});



export const PutApproveShopAd = Woowahan.Reducer.create(PUT_APPROVE_SHOPAD, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(response) {
        this.finish(response);
    };
    this.putData(`/v1/shopad/deals/${data.id}/approve`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});

export const PutRejectShopAd = Woowahan.Reducer.create(PUT_REJECT_SHOPAD, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(response) {
        this.finish(response);
    };

    this.putData(`/v1/shopad/deals/${data.id}/reject`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});


export const PutCancelShopAd = Woowahan.Reducer.create(PUT_CANCEL_SHOPAD, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(response) {
        this.finish(response);
    };

    this.putData(`/v1/shopad/deals/${data.id}/cancel`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});
