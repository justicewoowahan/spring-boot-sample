export const withdrawalDayHelper = {

    getAdStartGuideMessage(withdrawalDay) {
        switch (withdrawalDay) {
            case '5일':
                return '일반광고는 이번 달 11일부터 광고를 시작합니다.';
            case '15일':
                return '일반광고는 이번 달 21일부터 광고를 시작합니다.';
            case '25일':
                return '일반광고는 다음 달 1일부터 광고를 시작합니다.';
            default:
                return '';
        }

    }
};