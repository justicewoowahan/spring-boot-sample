import Woowahan from 'woowahan';
import template from './shop-search.hbs';
import collectionViewTemplate from "./shop-search-collection.hbs";
import ItemViewTemplate from "./shop-search-item.hbs";
import {GET_SHOP_LIST, GET_SHOP_OWNER_BY_SHOP} from "../../../actions/index";
import { combineViewUtil } from "../../commons/utils/combin-view-util";

export const shopSearchItem = Woowahan.ItemView.create('shopSearchItem', {
    template: ItemViewTemplate,
    onSelectedRow(event, trigger) {
        let checked = false;
        let clickedElement = $(event.target);
        let clickedElementType = clickedElement.attr('type');

        if (clickedElementType !== 'checkbox') {
            var checkElem = $(event.target.parentNode).find('input[name=shopId]')[0];
            checked = $(checkElem).prop('checked');
            checked = !checked;
        } else {
            checked = $(clickedElement).prop('checked');

        }

        $(checkElem).prop('checked',checked);
        this.setModel({checked:checked});
        this.dispatch(Woowahan.Event.create('shopChecked', this.getModel()));
        trigger(this.getModel());
    }
});


export const shopSearchCollectionView = Woowahan.CollectionView.create('shopSearchCollectionView', {
    template: collectionViewTemplate,
    rowContainer: '#tbl-shop',
    rowView: shopSearchItem,
    events: {
        'keyup .search-text': 'onKeyupShop',
        'click #btn-search': 'onClickSearch',
        '@shopChecked': 'onShopChecked',
        '@paging .pager-container': 'onPaging',
        '@paging .pager-container': 'onClickSearch'
    },

    initialize(model) {
        this.setModel(model);
        console.log('onShopSearchCollectionView:' + model.shopOwner.shopOwnerId);
        this.super();
        this.selectedShops = [];
    },

    viewDidMount() {
        this._loadShopOfShopOwnerIfShopOwnerExists();
    },
    
    _loadShopOfShopOwnerIfShopOwnerExists() {
        let shopOwner = this.getModel().shopOwner; 
        
        if (!shopOwner) {
            alert('선택된 업주가 존재하지 않습니다'); 
            return;
        }
        this.$('#shopOwnerId').val(shopOwner.shopOwnerId);
        this.onClickSearch();
    },

    onShopChecked(shop) {
        console.log('onShopChecked>>>');
        console.log(shop);
        this.refineShopList(shop);
        this.dispatch(Woowahan.Event.create('changeSelectedShop', {selectedShops: this.selectedShops}));
        $('#btn-save').text(`완료(선택업소:${this.selectedShops.length}개)`);
    },

    refineShopList(shop) {
        if (shop.checked) {
            this.addShop(shop);
            return;
        }
        this.removeShop(shop);
    },
    addShop(shop) {
        this.deleteShop(shop);
        this.selectedShops.push(shop);
    },
    removeShop(shop) {
        this.deleteShop(shop);
    },
    deleteShop(shop) {
        let savedIndexOfShop = this.findIndexOfShop(shop);

        if (savedIndexOfShop != -1) {
            this.selectedShops.splice(savedIndexOfShop,1);
        }
    },
    findIndexOfShop(shop) {
        for (var i=0; i<this.selectedShops.length; i++) {
            var savedShop = this.selectedShops[i];

            if (!savedShop) {
                continue;
            }
            console.log('savedShop>>');
            console.log(savedShop);
            if (savedShop.shopId === shop.shopId) {
                return i;
            }
        }
        return -1;
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

        this.dispatch(Woowahan.Action.create(GET_SHOP_LIST,param), this.updateShopList);
    },

    updateShopList(searchedShops) {
        this.reload(searchedShops);
        let totalCount = searchedShops.length;
        this.setModel(totalCount);
        this.$('[data-name=isEmpty]').css('display','none');
        if (!searchedShops.length) {
            this.$('[data-name=isEmpty]>td>.comment').html('검색결과가 없습니다.');
        }
    }

});


export const shopSearchView = Woowahan.View.create('shopSearchView' , {
    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #close': 'onCancel',
        'click .close': 'onCancel',
        // 'click #btn-save': 'onComplete',
        // 'click #btn-prev': 'onPrev',
        '@changeSelectedShop': 'onChangeSelectedShops'
    },

    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount()
    {

        this.addView('#shop-search-wrapper', shopSearchCollectionView, this.getModel());
        let top = $(window).scrollTop(),
            left = $(window).scrollLeft(),
            height = 500;

        $('.popup').css({
            top: 'calc(50% + ' + top + 'px)',
            left: 'calc(50% + ' + left + 'px)',
            height: height + 'px'
        });

    },
    onConfirm() {

    },
    // onSubmit(shop) {
    //     var data = {};
    //     data.confirm = true;
    //     data.shop = shop;
    //     this.closePopup(data);
    //     return true;
    //
    // },
    onCancel() {
        this.dispatch(Woowahan.Event.create('popupClose'));
    },
    onComplete() {
        console.log('onComplete');
        this.dispatch(Woowahan.Event.create('selectedComplete', this.getModel().selectedShops));
    },
    onChangeSelectedShops(selectedShops) {
        console.log('onChangeSelectedShops');
        console.log(selectedShops);
        this.setModel({selectedShops: selectedShops});
    },
    onPrev() {
        this.dispatch(Woowahan.Event.create('goPrevious'));
    }

});

