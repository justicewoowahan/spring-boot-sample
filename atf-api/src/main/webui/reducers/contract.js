import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';

import {
    GET_CONTRACT_LIST_OF_SHOP_AD
} from '../actions';

import {
    GetContractListOfShopAdSchema
} from '../schemas';

const onFailContract = function(error) {
};

export const GetContractListOfShopAd = Woowahan.Reducer.create(GET_CONTRACT_LIST_OF_SHOP_AD, GetContractListOfShopAdSchema, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailContract]);

    this.onSuccess = function(res) {
        this.finish(res);
    };



    console.log(`GetContractListOfShopAd:${data.bizNo}`);
    this.getData(`/v1/contracts/${data.bizNo}/shop-ads`, { contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});