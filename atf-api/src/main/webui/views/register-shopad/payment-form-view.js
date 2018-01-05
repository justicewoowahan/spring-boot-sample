import Woowahan from "woowahan";
import template from "./payment-form.hbs";
import {simplePopupView} from "../commons/popup/simple-popup-view";
import {popupUtils} from "../commons/utils/popup-util.js";

export const paymentFormView = Woowahan.View.create('paymentFormView', {
    template: template,
    events: {
    },

    initialize(model) {
        console.log('onPaymentFormView=>' + JSON.stringify(model));
        this.setModel(model);
        this.super();
    },

    viewDidMount() {

    }


    

});