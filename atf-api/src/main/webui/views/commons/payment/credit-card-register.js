import Woowahan from "woowahan";
import template from "./credit-card-register.hbs"


export const creditCardRegisterView = Woowahan.View.create('creditCardRegisterView', {
    template: template,
    events: {

    },

    initialize(model) {
        console.log('creditCardRegisterView');
        console.log(model);
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        console.log('creditCardRegisterView:viewDidMount');
    }

});