import Woowahan from "woowahan";
import template from "./added-shop-list.hbs";
import { addedShopItem} from "./added-shop-item";

export const addedShopListView = Woowahan.CollectionView.create('addedShopListView', {
    template: template,
    rowView: addedShopItem,
    rowContainer: '#tbl-added-shops',
    events : {

    },

    initialize(model) {
        console.log('addedShopListView>initialize>>' + JSON.stringify(model));
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        console.log('addedShopListView is loaded');
        this.reload(this.getAddedShops());
    },

    getAddedShops() {
        return this.getModel('addedShops');
    }



});