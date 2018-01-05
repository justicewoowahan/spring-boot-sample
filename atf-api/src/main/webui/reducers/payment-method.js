import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';
import {GetPaymentMethodListOfShopOwnerSchema,PostPaymentMethodBankAccountRegisterSchema} from '../schemas';

import {
    GET_PAYMENT_METHOD_REGISTER_INIT,
    POST_PAYMENT_METHOD_BANK_ACCOUNT_REGISTER,
    POST_PAYMENT_METHOD_CREDIT_CARD_REGISTER,
    GET_PAYMENT_METHOD_LIST_OF_SHOP_OWNER
} from '../actions'


export const GetPaymentMethodRegisterInit = Woowahan.Reducer.create(GET_PAYMENT_METHOD_REGISTER_INIT,function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.getData(`/v1/payment-methods/init`, {data: data, contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const PostPaymentMethodBankAccountRegister = Woowahan.Reducer.create(POST_PAYMENT_METHOD_BANK_ACCOUNT_REGISTER, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    console.log('data');
    console.log(data);
    this.postData(`/v1/payment-methods/bank-account`, {data: JSON.stringify(data.body), contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});

export const PostPaymentMethodCreditCardRegister = Woowahan.Reducer.create(POST_PAYMENT_METHOD_CREDIT_CARD_REGISTER, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    console.log('data');
    console.log(data);

    this.postData(`/v1/payment-methods/credit-card`, {data:JSON.stringify(data.body), contentType: 'application/json; charset=UTF-8', dataType: 'json'});
});

export const GetPaymentMethodListOfShopOwner = Woowahan.Reducer.create(GET_PAYMENT_METHOD_LIST_OF_SHOP_OWNER, GetPaymentMethodListOfShopOwnerSchema, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    const shopOwnerId = data.shopOwnerId;
    this.getData(`/v1/payment-methods/${shopOwnerId}`, {contentType: 'application/json; charset=UTF-8', dataType:'json'});
});
