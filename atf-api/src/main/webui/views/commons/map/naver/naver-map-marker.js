export const NaverMapMarker = class {
    constructor(map, id, options) {
        var marker = new naver.maps.Marker({
            position: options.position,
            map: map,
            draggable: true
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
        naver.maps.Event.addListener(this.marker, eventName, handler);
    }
};
