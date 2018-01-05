import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';
import {GetShopOwnerByShopSchema, GetShopOwnersSchema} from '../schemas/index.js';
import {GET_SHOP_OWNER_BY_SHOP, GET_SHOP_OWNER_LIST} from '../actions';

export const GetShopOwnerByShop = Woowahan.Reducer.create(GET_SHOP_OWNER_BY_SHOP, GetShopOwnerByShopSchema, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };

    this.getData(`/v1/shop-owners/search/shop/${data.shopId}`, {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    });
});

export const GET_SHOP_OWNERS = Woowahan.Reducer.create(GET_SHOP_OWNER_LIST, GetShopOwnersSchema, function (data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function (res) {
        this.finish(res);
    };
    this.getData(`/v1/shop-owners`, {data: data, contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});