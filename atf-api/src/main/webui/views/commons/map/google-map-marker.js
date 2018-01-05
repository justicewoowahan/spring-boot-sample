export const GoogleMapMarker = class {
    constructor(map, id, options) {
        var marker = new google.maps.Marker({
            position: options.position,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: options.name
        });
        this.id = id;
        this.marker = marker;
        this.map = map;
    }

    show() {
        this.marker.setMap(this.map);
    }

    hide() {
        this.marker.setMap(null);
    }

    addListener(eventName, handler) {
        this.marker.addListener(eventName, handler);
    }
};
