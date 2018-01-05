import Woowahan from 'woowahan';
import template from './contract-list-view.hbs';
import { contractListCollectionView } from "./contract-list-collection-view";


export const contractListView = Woowahan.PopupView.create('contractListView' , {
    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #btn-complete': 'onSubmit',
        'click #close': 'onCancel',
        'click .close': 'onCancel',
        '@contractChecked' : 'onContractChecked',
    },

    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount()
    {
        this.addView('#contract-list-wrapper', contractListCollectionView, this.getModel());
        console.log('contract-list-view>viewDidMount')
        let top = $(window).scrollTop(),
            left = $(window).scrollLeft(),
            height = $(window).height();

        $('.popup').css({
            top: 'calc(50% + ' + top + 'px)',
            left: 'calc(50% + ' + left + 'px)',
            height: height + 'px'
        });

    },
    onConfirm() {

    },
    onSubmit(contract) {
        var data = {};
        data.confirm = true;
        data.contract = this.getModel('');
        this.closePopup(data);
        return true;

    },
    onCancel() {
        this.closePopup();
        return false;
    },

    onContractChecked(contract) {
        console.log('contractchecked>>>' + JSON.stringify(contract));
        this.setModel({selectedContract: contract});
    },

    onSubmit() {
        var data = {};
        data.confirm = true;
        data.contract = this.getModel('selectedContract');
        this.closePopup(data);
    },
    onClose() {
        var data = {};
        data.confirm = false;
        this.closePopup(data);
    }



});

