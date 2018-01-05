import Woowahan from "woowahan";
import template from "./shop-owner-contract-inquiry.hbs";
import {GET_SHOPAD_DEAL_DETAIL_CONTRACT} from "../../../actions/shopad-deal-detail";

export default Woowahan.View.create('shopOwnerContractInquiryView', {
    template: template,
    events: {},

    initialize(data) {
        this.setModel(data);
        this.super();
    },

    viewDidMount() {
        const shopAdDealId = this.getModel('shopAdDealId');
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_DEAL_DETAIL_CONTRACT, {body: {shopAdDealId: shopAdDealId}}), this.onLoadView);
    },

    onLoadView(shopResponse) {

        this.setModel(
            {
                shopName: shopResponse.shopName,
                shopMenuCategoryName: shopResponse.shopMenuCategory,
                shopAddress: shopResponse.address
            }
        );
    }

});
