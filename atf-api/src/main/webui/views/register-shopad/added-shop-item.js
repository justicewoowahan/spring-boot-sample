import Woowahan from "woowahan";
import template from "./added-shop-item.hbs"

export const addedShopItem = Woowahan.ItemView.create('addedShopItem', {
    template: template,
    events: {
        'click .btn-delete-shop': 'onClickDeleteShop',
        'click td' : 'onSelectRow',
        'click .shop-row': 'onClickShopRow'
    },

    onClickShopRow(event) {
        console.log('added-shop-item>>onSelectedRow');
        // this.clearHighlight();
        let checked = false;
        let clickedElement = $(event.target);
        let clickedElementType = clickedElement.attr('type');

        if (clickedElementType !== 'checkbox') {
            var checkElem = $(event.target.parentNode).find('input[name=shopId]')[0];
            checked = $(checkElem).prop('checked');
            checked = !checked;
        } else {
            checked = $(clickedElement).prop('checked');

        }

        $(checkElem).prop('checked',checked);

        if (checked) {
            this.doHighlight(event);
        } else {
            this.clearHighlight(event);
        }

        this.setModel({checked: checked});

        this.dispatch(Woowahan.Event.create('changeShopSelected', this.getModel()));
    },

    onClickDeleteShop(event) {
        this.clearHighlight();
        this.doHighlight(event);
    },
    doHighlight(event) {
        var $target = $(event.target.parentNode);
        console.log(`tagName:${event.target.parentNode.tagName}`);

        if (event.target.parentNode.tagName === 'TD') {
            $target = $target.parent();
        }
        $target.addClass('selected-row');
    },
    clearHighlight(event ) {
        var $target = $(event.target.parentNode);
        console.log(`tagName:${event.target.parentNode.tagName}`);

        if (event.target.parentNode.tagName === 'TD') {
            $target = $target.parent();
        }
        $target.removeClass('selected-row');
    },
    onClickDeleteShop() {
        console.log('onClickDeleteShop>>>>>');
        this.dispatch(Woowahan.Event.create('shopDeleted', {shop:this.getModel()}));
    }
    
});
