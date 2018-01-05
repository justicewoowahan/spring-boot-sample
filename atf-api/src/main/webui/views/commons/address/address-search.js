import Woowahan from 'woowahan';
import template from './address-search.hbs';
import collectionViewTemplate from './address-search-collection.hbs';
import itemViewTemplate from './address-search-item.hbs';
import {Pager} from '../../control/index';
import {
    GET_ADDRESS_SIDO,
    GET_ADDRESS_SIDO_SIGUNGU,
    GET_ADDRESS_SIDO_SIGUNGU_JUSO,
    POST_ADDRESS_SELECT
} from '../../../actions/index';


export const addressSearchItem = Woowahan.ItemView.create('addressSearchItem', {
    template: itemViewTemplate,

    onSelectedRow(event, trigger) {
        this.dispatch(Woowahan.Event.create('addressChecked', this.getModel()));
        trigger(this.getModel());
    }
});

export const AddressSearchCollectionView = Woowahan.CollectionView.create('AddressSearchCollectionView', {
    template: collectionViewTemplate,
    rowContainer: '#tbl-address',
    rowView: addressSearchItem,

    events: {
        'keyup #txt-addr': 'onKeyupAddress',
        'click #btn-search': 'onClickSearch',
        '@change select[data-name=sido]': 'onChangeSido(select[data-name=sido])',
        '@addressChecked': 'onCheckAddress',
        '@paging .pager-container': 'onPaging',
        'click #btn-submit': 'onSubmitAddress',
        'keydown #txt-address': 'onKeyDownSearch'
    },

    viewDidMount($el) {
        this.dispatch(Woowahan.Action.create(GET_ADDRESS_SIDO), this.updateAddressSido);
    },

    updateAddressSido(data) {
        const sido = [{ value: '', label: '대분류' }];

        _.each(data, function(item) {
            sido.push({ value: item.code, label: item.name });
        });

        this.setModel({ sido });
    },

    updateAddressSigungu(data) {
        const sigungu = [{ value: '', label: '중분류' }];

        _.each(data, function(item) {
            sigungu.push({ value: item.code, label: item.name });
        });

        this.setModel({ sigungu });
    },

    updateAddressList(data) {
        this.reload(data.content);
        this.$('[data-name=isEmpty]').css('display','none');
        if (!data.content.length) {
            this.$('[data-name=isEmpty]>td>.comment').html('검색결과가 없습니다.');
        }

        this.updateView('.pager-container', Pager, Pager.parsePageable(data));
    },

    checkSubmit() {
        const addr1 = this.$('[data-name=selectedAddress]').text();
        const addr2 = this.$('#txt-addr').val();
        this.$('#btn-submit').removeClass('disabled');
    },

    onChangeSido(sidoCode) {
        if (!!sidoCode) {
            this.setModel({ sidoCode });

            this.dispatch(Woowahan.Action.create(GET_ADDRESS_SIDO_SIGUNGU, { sidoCode: +sidoCode }), this.updateAddressSigungu);
        }
    },
    onKeyDownSearch(e) {
        if(e.keyCode == 13) {
            this.onClickSearch(1);
        }
    },

    onClickSearch(page = 1) {
        const sidoCode = this.$('[data-name=sido]').val();
        const sigunguCode = this.$('[data-name=sigungu]').val();
        const search = this.$('#txt-address').val();

        if (!sidoCode || !sigunguCode || !search) {
            return;
        }

        page = Number(page);

        this.dispatch(Woowahan.Action.create(GET_ADDRESS_SIDO_SIGUNGU_JUSO, { sidoCode, sigunguCode, search, page }), this.updateAddressList);
    },

    onCheckAddress(data) {
        this.setModel({
            selectedAddress: data,
            selectedFullTextJibun:data.fullTextJibun
        });

        this.checkSubmit();
    },

    onKeyupAddress() {
        this.checkSubmit();
    },

    onSubmitAddress() {
        // this.checkSubmit();
        console.log('onSubmitAddress');
        const model = this.getModel('selectedAddress');
        const detail = this.$('#txt-addr').val();

        this.dispatch(Woowahan.Action.create(POST_ADDRESS_SELECT, {jusoDetailRequest:model, detail: detail}), this.resolveAddress);
    },

    onPaging(page) {
        this.onClickSearch(--page);
    },
    resolveAddress(data) {
        console.log('resolveAddress');
        console.log(data);
        this.dispatch(Woowahan.Event.create('addressSubmit', data));
    }


});

export const addressSearchView = Woowahan.PopupView.create('addressSearchView' , {
    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #close': 'onCancel',
        'click .close': 'onCancel',
        '@addressSubmit': 'onSubmit'
    },

    viewDidMount() {
        this.addView('#address-search-wrapper', AddressSearchCollectionView);
        let top = $(window).scrollTop(),
            left = $(window).scrollLeft(),
            height = $(window).height();

        $('.popup').css({
            top: 'calc(50% + ' + top + 'px)',
            left: 'calc(50% + ' + left + 'px)',
            height: height + 'px'
        });

    },

    onSubmit(data) {
        var result = {};
        result.confirm = true;
        result.selectedAddress = data;

        console.log(result);
        this.closePopup(result);
        return true;

    },

    onCancel() {
        this.closePopup();
        return false;
    }


});