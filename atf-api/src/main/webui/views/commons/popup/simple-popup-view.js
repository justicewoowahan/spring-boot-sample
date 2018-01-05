import Woowahan from 'woowahan';
import template from './simple-popup-view.hbs';


export const simplePopupView = Woowahan.PopupView.create('simplePopupView' , {
    template: template,
    events: {
        'click #btn-cancel': 'onCancel',
        'click #btn-confirm': 'onConfirm',
        'click #close': 'onCancel',
        'click .close': 'onCancel'
    },

    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount()
    {

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
    onConfirm() {
        var data = {};
        data.confirm = true;
        this.closePopup(data);
        return true;

    },
    onCancel() {
        var data = {};
        data.confirm = false;
        this.closePopup(data);
        return false;
    }

});

