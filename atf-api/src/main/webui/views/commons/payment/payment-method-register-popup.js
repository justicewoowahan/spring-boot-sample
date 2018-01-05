import Woowahan from "woowahan";
import template from "./payment-method-register-popup.hbs";
import {creditCardRegisterView} from "./credit-card-register";
import {bankAccountRegisterView} from "./bank-account-register";
import {
    GET_PAYMENT_METHOD_REGISTER_INIT,
    POST_PAYMENT_METHOD_BANK_ACCOUNT_REGISTER,
    POST_PAYMENT_METHOD_CREDIT_CARD_REGISTER
} from "../../../actions";
import {simplePopupView} from "../popup/simple-popup-view";

export const paymentMethodRegisterView = Woowahan.PopupView.create('paymentMethodRegisterView', {

    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #close': 'onCancel',
        'click .close': 'onCancel',
        'click #paymentMethodBankAccount': 'onPaymentMethodBankAccount',
        'click #paymentMethodCreditCard': 'onPaymentMethodCreditCard',
        'click #btn-save': 'onSave'
    },

    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        this.dispatch(Woowahan.Action.create(GET_PAYMENT_METHOD_REGISTER_INIT, {}), this.registerFormInit);
    },

    registerFormInit(data) {
        console.log(`registerFormId:${data}`);
        data.banks = data.banks.map(bank => ({label: bank.name, value: bank.id}));
        data.creditCardTypes = data.creditCardTypes.map(type => ({
            label: type.label,
            value: type.value,
            name: 'creditCardTypes'
        }));
        this.setModel(data);
        this.onPaymentMethodCreditCard();
    },

    onPaymentMethodBankAccount() {
        this.paymentMethodType = 'BANK_ACCOUNT';
        let data = this.getModel();
        this.addView('#register-form-wrapper', bankAccountRegisterView, data);
    },

    onPaymentMethodCreditCard() {
        this.paymentMethodType = 'CREDIT_CARD';
        let data = this.getModel();
        this.addView('#register-form-wrapper', creditCardRegisterView, data);
    },

    onSave() {
        let shopOwnerId = this.getModel().shopOwnerId;
        console.log(`shopOwnerId:${shopOwnerId}`);

        switch (this.paymentMethodType) {
            case 'CREDIT_CARD':
                this._registerCreditCard(shopOwnerId);
                break;
            case 'BANK_ACCOUNT':
                this._registerBankAccount(shopOwnerId);
                break;
        }
    },
    _registerCreditCard(shopOwnerId) {
        let creditCardData = {
            shopOwnerId: shopOwnerId,
            creditCardType: $('input[name=creditCardTypes]:checked').val(),
            creditCardNumber: $('#creditCardNumber').val(),
            birthday: $('#birthday').val(),
            expireMonth: $('#expireMonth').val(),
            expireYear: $('#expireYear').val(),
            prefixOfPassword: $('#prefixOfPassword').val(),
            ownerName: $('#ownerName').val(),
            email: $('#email').val()
        };
        this.dispatch(Woowahan.Action.create(POST_PAYMENT_METHOD_CREDIT_CARD_REGISTER, {body: creditCardData}), this.registerComplete);
    },
    _registerBankAccount(shopOwnerId) {
        let bankAccountData = {
            shopOwnerId: shopOwnerId,
            bankId: $('#bankId').val(),
            accountNumber: $('#bankNameAccountNumber').val(),
            authenticationNumber: $('#authNumber').val(),
            ownerName: $('#ownerName').val()
        };

        this.dispatch(Woowahan.Action.create(POST_PAYMENT_METHOD_BANK_ACCOUNT_REGISTER, {body: bankAccountData}), this.registerComplete);
    },

    registerComplete() {
        alert('등록되었습니다');
        var result = {};
        result.confirm = true;
        this.closePopup(result);
    },

    onCancel() {
        this.closePopup();
    }

});