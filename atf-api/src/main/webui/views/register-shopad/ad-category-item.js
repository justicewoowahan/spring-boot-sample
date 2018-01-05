import Woowahan from "woowahan";
import template from "./ad-category-item.hbs"

export const adCategoryItem = Woowahan.ItemView.create('adCategoryItem', {
    template: template,
    events: {

    },

    initialize(model) {
        this.setModel(model);
        this.super();
    }

});