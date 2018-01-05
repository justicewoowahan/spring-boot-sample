import Woowahan from 'woowahan';
import template from './contract-list-collection-view.hbs';
import { contractItem } from './contract-list-item'
import { GET_CONTRACT_LIST_OF_SHOP_AD} from "../../../actions/index";
import { contractUtil } from "./contract-util";


export const contractListCollectionView = Woowahan.CollectionView.create('contractListCollectionView', {
    template: template,
    rowContainer: '#tbl-contract-list',
    rowView: contractItem,

    events: {
        'change #paymentMethod': 'onChangePaymentOption',
        'change #paymentDay': 'onChangePaymentOption',
        'click #btn-complete': 'onClickComplete',
        'click #btn-close': 'onClose'
    },

    initialize(model) { 
        this.setModel(model);
        this.super();
        this.setModel({shopOwnerName: model.shopOwner.shopOwnerName, name: model.shopOwner.name, bizNo:model.shopOwner.bizNo});
        this.setModel({paymentMethods: contractUtil.paymentMethodList(), paymentDays: contractUtil.paymentDayList()});
        this._bindModel();
    },

    viewDidMount() {
        console.log('viewDidMount > contractListCollectionView');
        this.searchContract();
    },
    onChangePaymentOption(e) {
        let contracts = this.getModel('contracts');
        
        if (!contracts) { 
            return;
        }

        let paymentMethod = $('#paymentMethod').val();
        let paymentDay = $('#paymentDay').val();


        contracts = contracts.filter(this.getFilterFunction(paymentMethod, paymentDay));

        this.reload(contracts);
    },
    
    getFilterFunction(paymentMethod, paymentDay) { 
        if (paymentMethod === "" && paymentDay === "") {
            return function(contract) { 
                return true;
            };
        }

        if (paymentMethod === "" && paymentDay !== "") {
            return function(contract) { 
                return contract.paymentDay === paymentDay;
            };
        }

        if (paymentMethod !== "" && paymentDay === "") {
            return function(contract) {
                return contract.paymentMethodName === paymentMethod;
            };
        }

        return function(contract) {
            return contract.paymentMethodName === paymentMethod && contract.paymentDay === paymentDay;
        }
    },

    searchContract() {
        const bizNo = this.getModel().shopOwner.bizNo;
        console.log(`bizNo:${bizNo}`);
        this.dispatch(Woowahan.Action.create(GET_CONTRACT_LIST_OF_SHOP_AD, { bizNo: bizNo }), this.updateContractList);
    },

    updateContractList(contracts) {
        console.log('updateContractList:'+ JSON.stringify(contracts));

        if (!contracts.length || contracts.length === 0) {
            this.$('[data-name=isEmpty]>td>.comment').html('전자 계약서가 존제하지 않습니다.');
            return;
        }

        let _this = this;
        contracts = contracts.map(contract => {return _this._contractItemFactory(contract);});


        let totalCount = contracts.length;
        this.$('[data-name=isEmpty]').css('display','none');

        this.setModel({contracts: contracts, totalCount: totalCount});
        this.reload(contracts);

    },
    _contractItemFactory(contract) {
        if (contract.accountOwner !== "") {
            return {
                owner: contract.accountOwner,
                paymentMethodNumber: contract.bankAccountNumber,
                bankName : contract.bankName,
                paymentMethodName: contract.paymentType,
                paymentDay: contract.paymentDay,
                concentFileName: contract.concentFileName,
                concentFilePath: contract.concentFilePath
            };
        };

        return {
            owner: contract.cardOwner,
            paymentMethodNumber: contract.cardName,
            bankName : '-',
            paymentMethodName: contract.paymentType,
            paymentDay: contract.paymentDay,
            concentFileName: contract.concentFileName,
            concentFilePath: contract.concentFilePath
        };
    }

});

