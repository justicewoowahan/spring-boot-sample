import Woowahan from "woowahan";
import template from "./map-view.hbs";
import {GoogleMap, GoogleMarker} from "./google-map";
import {GET_ADDRESS_CONVERSION} from '../../../actions/index';

export const mapView = Woowahan.CollectionView.create('MapView', {
    template: template,
    events : {
    },

    initialize(model) {
        this.setModel(model);
        this.super();
    },

    viewDidMount() {
        console.log("'mapView' did mount!");
        this.onUpdateMapView()
    },


    _drawCircle(centerLoc, radius , color) {

        this.map.addCircle('testCircle',
            centerLoc,
            radius,
            {
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.35

            }
        );
    },

    _drawDeliveryRegions(coords, color) {
        this.map.addPolygon(coords, {
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: color,
            fillOpacity: 0.35
        });
    },

    onUpdateMapView() {
        console.log('onUpdateMapView');
        const model = this.getModel();
        const latitude = model.latitude;
        const longitude = model.longitude;

        this._initMap(latitude, longitude)

    },

    _initMap(latitude, longitude) {
        this.map = new GoogleMap('map', 'testmap', latitude, longitude, 15);
        let markerId = this.map.addMarker(this.id++, {lat: latitude, lng: longitude }, '', '');

        this.map.addListener(markerId, 'dragend', function (event) {
            console.log(`ad point moved to ${event.latLng.lat()}, ${event.latLng.lng()}`);
            this.dispatch(Woowahan.Action.create(GET_ADDRESS_CONVERSION, {latitude: event.latLng.lat(), longitude: event.latLng.lng()}), this.onAddressConversion);
        }.bind(this));
    },

    onAddressConversion(address) {
        this.dispatch(Woowahan.Event.create('onChangedAddress', address));
    }

});

