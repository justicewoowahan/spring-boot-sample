export const contractUtil = {
    paymentDayList() { 
        return [{label: "전체", value: ""},{label: "매월 5일", value: "매월 5일"}, {label:"매월 15일", value:"매월 15일"}, {label: "매월 25일", value:"매월 25일"}];
    },

    paymentMethodList() {
        return [{label: "전체", value: ""},{label:"자동이체",value:"자동이체"},{label:"신용카드", value:"신용카드"}];
    }

}