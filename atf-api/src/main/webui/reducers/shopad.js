import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';

import {GET_SHOPAD_FORM, POST_SHOPAD } from '../actions';

import {GetShopAdFormSchema} from '../schemas';

export const GetShopAdForm = Woowahan.Reducer.create(GET_SHOPAD_FORM, GetShopAdFormSchema, function(data) {
    console.log('GetShopAdForm>>');
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    console.log('GetShopAdForm>>');
    this.getData(`/v1/shopad?shopOwnerId=`+ data.shopOwnerId, {contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const PostShopAd = Woowahan.Reducer.create(POST_SHOPAD, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(response) {
        this.finish(response);
    };

    this.postData(`/v1/shopad/201507090011`, { data: JSON.stringify(data.body), contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});
