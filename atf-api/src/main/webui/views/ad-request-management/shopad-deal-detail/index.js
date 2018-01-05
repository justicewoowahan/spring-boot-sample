import Woowahan from "woowahan";
import template from "./index.hbs";
import shopOwnerContractInquiryView from './shop-owner-contract-inquiry';
import requestedShopAdListView from './shopad-list';
import requestedShopAdDealView from './shopad-deal';

export const shopAdDealDetailView = Woowahan.View.create('shopAdDealDetailView', {

    template: template,

    events: {

    },

    initialize() {
        console.log("initialize shopAdDealDetailView");
        this.super();

    },

    viewDidMount() {
        let shopAdDealId = this.params.shopAdDealId;
        this.setModel({shopAdDealId:shopAdDealId});
        this.addViews(this.getModel());
    },

    addViews(data) {
        this.addView("#shopOwnerContract", shopOwnerContractInquiryView, data);
        this.addView("#requestedShopAdDeal", requestedShopAdDealView, data);
        this.addView("#requestedShopAdList", requestedShopAdListView, data);
    }
});
