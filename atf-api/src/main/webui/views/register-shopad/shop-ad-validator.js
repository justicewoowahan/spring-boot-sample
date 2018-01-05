import {stringUtils} from "../../commons/string-utils";

export const shopAdValidator = {
    validateForm(reqAd, container) {
        if (stringUtils.isEmpty(reqAd.adStartDate)) {
            container.alertPopup('', '광고 시작일을 선택해 주세요');
            return false;
        }

        if (stringUtils.isEmpty(reqAd.adShopName)) {
            container.alertPopup('', '광고 업소명을 입력해 주세요');
            return false;
        }

        if (stringUtils.isEmpty(reqAd.adMenuCategoryId)) {
            container.alertPopup('', '광고 카테고리를 선택해 주세요');
            return false;
        }


        if (stringUtils.isEmpty(reqAd.paymentMethodId)) {
            container.alertPopup('', '결제수단을 선택해 주세요');
            return false;
        }

        if (stringUtils.isEmpty(reqAd.latitude) || stringUtils.isEmpty(reqAd.longitude)) {
            container.alertPopup('', '광고 포인트를 입력해 주세요');
            return false;
        }

        let shopOwner = container.getShopOwner();

        if (shopOwner == null) {
            container.alertPopup('', '업주를 선택해 주세요');
        }

        let shop = container.getCurrentShop();

        if (shop == null) {
            container.alertPopup('', '업소를 선택해 주세요');
            return false;
        }


        let contract = container.getContract();

        if (contract == null) {
            container.alertPopup('', '계약서를 선택해 주세요');
            return false;
        }
        return true;
    },


    validateContract(requestParams, container) {

        const contractOfShopList = container.getContractOfShopList() || [];
        console.log('onInit>> contractOfShopList:' + JSON.stringify(contractOfShopList));

        if (contractOfShopList.length === 0) {
            container.alertPopup('', '계약서를 선택해 주세요');
            return false;
        }

        let shopContract = contractOfShopList[0];
        console.log(`applicant ad count: ${shopContract.shopApplicantCount}`);

        if (parseInt(shopContract.shopApplicantCount) < requestParams.length) {
            container.alertPopup(null, '광고 신청 개수가 계약서에 명시된 광고 개수보다 많습니다');
            return false;
        }

        return true;
    },
};