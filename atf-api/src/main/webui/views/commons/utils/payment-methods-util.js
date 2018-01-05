export const paymentMethodUtil = {
    mapToOption(paymentMethods) {
        return paymentMethods.map(paymentMethod => {
            return ({
                label: paymentMethodUtil.convertPaymentMethodToLabel(paymentMethod),
                value: paymentMethod.id
            });
        });
    },
    convertPaymentMethodToLabel(paymentMethod) {
        switch(paymentMethod.paymentMethodType) {
            case 'BANK_ACCOUNT':
                return `계좌번호: ${paymentMethod.accountNumber}`;
            case 'CREDIT_CARD':
                return `신용카드 : ${paymentMethod.creditCardNumber}`;
            default:
                throw new Error(`${paymentMethodType}은 알수없는 타입 입니다`);
        }
    }
}