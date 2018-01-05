import Woowahan from "woowahan";
import template from "./shopad-deals.hbs";
import dealListTemplate from "./shopad-deals-list.hbs";
import {GET_SHOPAD_DEAL_LIST_INIT, GET_SHOPAD_DEAL_LIST} from '../../actions/index';
import {Pager , pagerUtil } from "../control/index";

export const shopAdDealListView = Woowahan.View.create('shopAdDealListView', {
    template: dealListTemplate,
    events :{
        'click .btn-view' : 'onClickView'
    },
    
    initialize(model) {
        console.log('model>>');
        this.setModel(model);
        this.super();
    },

    onClickView(e) {
        console.log('onClickDealRow');
        window.location.href='#/shopad/approve/' + this.$(e.target).data('id');
    },

    viewDidMount() {
    }
});

export const shopAdDealManagementView = Woowahan.View.create('shopAdDealManagementView', {
    page:0,
    status: 'WAIT_FOR_APPROVAL',
    template: template,
    events: {
        'click #btn-search': 'onClickSearch',
        'click #btn-init-search': 'onClickInitSearch',
        '@paging .pager-container': 'onPaging',
        'click .status-tab': 'onClickStatus'
    },

    initialize() {
        this.super();
        this._initDateCondition();
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_DEAL_LIST_INIT), this.initForm);
    },

    viewDidMount() {
    },

    _initDateCondition() {
        let today = moment().format("YYYY-MM-DD");
        $('#fromDate').val("2017-07-02");
        $('#toDate').val(today);
        $('#withdrawalDateId').val('REG_DATE');
    },

    initForm(data) {
        let withdrawalDates = [{label: '선택안함', value: ''}];
        data.withdrawalDates = withdrawalDates.concat(data.withdrawalDates.map(withdrawalDate => ( {
            label: `${withdrawalDate.day}일`,
            value: withdrawalDate.id,
            name: 'withdrawalDateId'
        } )));
        this.setModel(data);
        this.onClickSearch();

    },

    onClickSearch() {
        this._getDeals(0);
    },

    _getDeals(page) {
        this.page = page;

        let param = {
            dateCondition: this.$("#dateCondition").val(),
            fromDate: this.$("#fromDate").val(),
            toDate: this.$("#toDate").val(),
            shopId: this.$("#shopId").val(),
            shopOwnerId: this.$("#shopOwnerId").val(),
            shopOwnerId: this.$("#contractId").val(),
            withdrawalDateId: this.$("#withdrawalDateId").val(),
            page: this.page,
            status: this.status
        };
        console.log(param);

        this.dispatch(Woowahan.Action.create(GET_SHOPAD_DEAL_LIST, param), this.renderDealList);
    },

    onClickInitSearch() {
        this._initDateCondition();
        this.$("#shopId").val('');
        this.$("#shopOwnerId").val('');
        this.$("#contractId").val('');
        this.$("#withdrawalDateId").val('');
    },

    renderDealList(data) {
        this.addView('#deal-list-wrapper', shopAdDealListView, {deals:data.content});
        this.updateView('.pager-container', Pager, pagerUtil.parsePageable(data));
    },

    onPaging(page) {
        console.log(`click page:${page}`);
        this.page = page-1;
        this._getDeals(this.page);
    },

    onClickStatus(e) {
        this.status = $(e.target).data('status');
        this._clearActiveTab();
        $(e.target).parent().addClass('active');
        this._getDeals(0);
    },

    _clearActiveTab() {
        this.$('.status-tab').removeClass('active');
    }
});