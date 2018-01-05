import Woowahan from "woowahan";
import template from "./shopad-deal.hbs";
import {GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST} from "../../../actions/shopad-deal-detail";

export default Woowahan.View.create('requestedShopAdDealView', {
    template: template,
    events: {},

    initialize(data) {
        this.setModel(data);
        this.super();
        const shopAdDealId = this.getModel('shopAdDealId');
        this.dispatch(Woowahan.Action.create(GET_SHOPAD_DEAL_DETAIL_SHOPAD_LIST, {body: {shopAdDealId: shopAdDealId}}), this.onLoadView);
    },

    viewDidMount() {
    },

    onLoadView(shopAdDealResponse) {

        let paymentValue = `${shopAdDealResponse.paymentMethod.paymentMethodType.label}: ${shopAdDealResponse.paymentMethod.paymentMethodNumber}`;

        this.setModel(
            {
                paymentMethod : paymentValue,
                withdrawalDates: {
                    label: `${shopAdDealResponse.withdrawalDate.day}일`,
                    value: shopAdDealResponse.withdrawalDate.id,
                    name:'withdrawalDateId'
                }
            }
        );

        this.updateView();
    }
});
