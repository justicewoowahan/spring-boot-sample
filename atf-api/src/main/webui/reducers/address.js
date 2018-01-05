import Woowahan from 'woowahan';
import {onFailGlobal} from '../commons';

import {
    GET_ADDRESS_JUSO,
    GET_ADDRESS_SIDO,
    GET_ADDRESS_SIDO_SIGUNGU,
    GET_ADDRESS_SIDO_SIGUNGU_DONG_OF_ADMIN,
    GET_ADDRESS_SIDO_SIGUNGU_JUSO,
    POST_ADDRESS_SELECT,
    GET_ADDRESS_CONVERSION
} from '../actions';

import {
    GetAddressJusoSchema,
    GetAddressSidoSchema,
    GetAddressSidoSigunguJusoSchema,
    GetAddressSidoSigunguSchema,
    PostAddressSelectSchema
} from '../schemas';


const onFailAddress = function(error) {
};

let sido, sigungu = {};


export const GetAddressJuso = Woowahan.Reducer.create(GET_ADDRESS_JUSO, GetAddressJusoSchema, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailAddress]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.params = { search: data.search };

    if (!!data.page) {
        this.params.page = data.page;
    }

    this.getData('/v1/address/juso', { data: this.params, contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const GetAddressSido = Woowahan.Reducer.create(GET_ADDRESS_SIDO, GetAddressSidoSchema, function() {
    if (!!sido) {
        this.finish(sido);

        return;
    }

    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailAddress]);

    this.onSuccess = function(res) {
        sido = res;

        this.finish(res);
    };

    this.getData('/v1/address/sido', { contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const GetAddressSidoSigungu = Woowahan.Reducer.create(GET_ADDRESS_SIDO_SIGUNGU, GetAddressSidoSigunguSchema, function(data) {
    if (!!sigungu[data.sidoCode]) {
        this.finish(sigungu[data.sidoCode]);

        return;
    }

    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailAddress]);

    this.onSuccess = function(res) {
        const sidoCode = res[0].sido.code;

        sigungu[sidoCode] = res;

        this.finish(res);
    };

    this.getData(`/v1/address/sido/${data.sidoCode}/sigungu`, { contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const GetAddressSidoSigunguDongOfAdmin = Woowahan.Reducer.create(GET_ADDRESS_SIDO_SIGUNGU_DONG_OF_ADMIN, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailAddress]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.getData(`/v1/address/sido/${data.sidoCode}/sigungu/${data.sigunguCode}/dong-of-admin`, { data: this.params, contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const GetAddressSidoSigunguJuso = Woowahan.Reducer.create(GET_ADDRESS_SIDO_SIGUNGU_JUSO, GetAddressSidoSigunguJusoSchema, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal, onFailAddress]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.params = { search: data.search };

    if (!!data.page) {
        this.params.page = data.page;
    }

    if (data.size) {
        this.params.size = data.size;
    }

    this.getData(`/v1/address/sido/${data.sidoCode}/sigungu/${data.sigunguCode}/juso`, { data: this.params, contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const PostAddressSelect = Woowahan.Reducer.create(POST_ADDRESS_SELECT, PostAddressSelectSchema, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.postData('/v1/address/select', { data: JSON.stringify({ detail: data.detail, juso: data.jusoDetailRequest }), contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});

export const GetAddressConversion = Woowahan.Reducer.create(GET_ADDRESS_CONVERSION, function(data) {
    this.use(Woowahan.Reducer.FAIL, [onFailGlobal]);

    this.onSuccess = function(res) {
        this.finish(res);
    };

    this.getData('/v1/address/conversion/coordinates2address', { data: { latitude: data.latitude, longitude: data.longitude }, contentType: 'application/json; charset=UTF-8', dataType: 'json' });
});
