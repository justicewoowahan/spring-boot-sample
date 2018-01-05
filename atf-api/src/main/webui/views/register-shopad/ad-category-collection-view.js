import Woowahan from "woowahan";
import template from "./ad-category-list.hbs";
import {adCategoryItem} from "./ad-category-item";
import {simplePopupView} from "../commons/popup/simple-popup-view";


export const adCategoryCollectionView = Woowahan.CollectionView.create('adCategoryCollectionView', {
    template: template,
    rowView: adCategoryItem,
    rowContainer: '#tbl-ad-categories',

events: {
    },

    initialize(model) {
        console.log(model)
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        this.reload(this.getShopAdCategories());
    },

    refineCategoryList() {

        this.setModel({adCategoryList:adCategoryList});
    },

    getShopAdCategories() {
        return this.getModel('adMenuCategoryList');
    }

});
