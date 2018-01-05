import Woowahan from "woowahan";
import template from "./bank-account-register.hbs"


export const bankAccountRegisterView = Woowahan.View.create('BankAccountRegisterView', {
    template: template,
    events: {},

    initialize(model) {
        this.setModel(model);
        this.super();
    },
    viewDidMount() {
    }

});