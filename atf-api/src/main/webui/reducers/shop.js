import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';
import {GET_SHOP, GET_SHOP_LIST} from '../actions';
import {GetShopListSchema, GetShopSchema} from '../schemas';

export const GetShopList = Woowahan.Reducer.create(GET_SHOP_LIST, GetShopListSchema, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shops`, {data: data, contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});

export const GetShop = Woowahan.Reducer.create(GET_SHOP, GetShopSchema, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shops/${data.shopId}`, {contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});


