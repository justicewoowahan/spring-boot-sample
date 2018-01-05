import Woowahan from 'woowahan';
import template from './shop-owner-collection-view.hbs'
import { shopOwnerSearchItem } from './shop-owner-item-view';
import {GET_SHOP_OWNER_LIST } from "../../../actions/index";

export const shopOwnerCollectionView = Woowahan.CollectionView.create('shopOwnerSearchView', {
    template: template,
    rowContainer: '#tbl-shop-owner',
    rowView: shopOwnerSearchItem,

    events: {
        'keyup .search-text': 'onKeyupShop',
        'click #btn-search': 'onClickSearch',
        '@shopChecked' : 'onCheckedShop',
        '@paging .pager-container': 'onPaging'
    },
    
    initialize(model) { 
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
    },

    onCheckedShop(data) {
        this.setModel({selectedShop: data});
        // this.dispatch(Woowahan.Action.create(GET_SHOP_OWNER_LIST, {shopId: data.shopId}), this.submitShop);
    },

    submitShop(showOwnerForSelectedShop) {
        console.log('submitShop');
        let shop = this.getModel('selectedShop');
        shop.shopOwner = showOwnerForSelectedShop;
        console.log(shop);
        this.dispatch(Woowahan.Event.create('shopSubmit', shop));
    },

    onKeyupShop(e) {
        if(e.keyCode == 13) {
            this.onClickSearch();
        }
    },

    onClickSearch() {
        let options = this.$('.search-text').filter(function(){
            return $(this).val() != '' && $(this).val().length > 0;
        });

        if (!options || options.length == 0) {
            alert('옵션을 선택해주세요');
            return;
        }

        let selectedOption = this.$(options[0]);
        console.log(selectedOption);
        let searchOption = selectedOption.attr('id');
        const searchText = selectedOption.val();

        var param = {};
        param[searchOption] = searchText;

        this.dispatch(Woowahan.Action.create(GET_SHOP_OWNER_LIST, param), this.updateShopOwnerList);
    },

    updateShopOwnerList(shopOwnerList) {
        const shopOwners = shopOwnerList.results;
        this.reload(shopOwners);
        let totalCount = `검색 업주 수 : ${shopOwners.length}`;
        this.setModel(totalCount);
        this.$('[data-name=isEmpty]').css('display','none');
        if (!shopOwners.length) {
            this.$('[data-name=isEmpty]>td>.comment').html('검색결과가 없습니다.');
        }
    }

});