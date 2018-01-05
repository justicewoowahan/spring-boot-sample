export const shopAdDealStatusControlHelper = {
    WAIT_FOR_APPROVAL_VISIBLE: 'hide',
    REJECTED_VISIBLE: 'hide',
    CANCELED_VISIBLE: 'hide',
    APPROVED_VISIBLE: 'hide',


    getVisibles(status) {
        if (!!status) {
            let visibleKey = status + '_VISIBLE';
            console.log(`visibleKey:${visibleKey}`);
            this[visibleKey] = 'show';
        }
        return {
            "WAIT_FOR_APPROVAL_VISIBLE": this.WAIT_FOR_APPROVAL_VISIBLE,
            "REJECTED_VISIBLE": this.REJECTED_VISIBLE,
            "CANCELED_VISIBLE": this.CANCELED_VISIBLE,
            "APPROVED_VISIBLE": this.APPROVED_VISIBLE
        };
    }
};