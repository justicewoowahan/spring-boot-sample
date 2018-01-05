import {NaverMapMarker} from "./naver-map-marker";

export const NaverMap = class {

    constructor(mapDiv, mapTypeId, lat, lng, zoomLevel, options) {
        this.mapDiv = mapDiv;
        this.mapTypeId = mapTypeId;
        this.centerLoc = {lat: lat, lng: lng};
        this.zoomLevel = zoomLevel;
        this.markers = {};
        this.circles = {};
        var _this = this;

        var map = new naver.maps.Map(document.getElementById(this.mapDiv), {
            center: new naver.maps.LatLng(_this.centerLoc.lat, _this.centerLoc.lng),
            zoom: _this.zoomLevel,
            zoomControl: true,
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT
            }
        });
        this.map = map;
    }

    clear() {
        this.markers = {};
        this.map = null;
    }

    addMarker(markerId, position, image, className) {
        var marker = new NaverMapMarker(this.map, markerId, {position : position, image:image, className:className});
        this.markers[markerId] = marker;
        return markerId;
    }

    removeMarker(id) {
        console.log('removeMarker:' + id);
        this.markers[id].hide();
    }

    removeAllMarker() {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].marker.setMap(null);
        }
    }

    addCircle(id,centerLoc, radius,options) {
        var _this = this;
        var circle = new naver.maps.Circle({
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight,
            fillColor: options.fillColor,
            fillOpacity: options.fillOpacity,
            map: _this.map,
            center: centerLoc,
            radius: Math.sqrt(radius) * 100
        });
        this.circles[id]=circle;
    }

    removeCircle(id) {
        this.circles[id].setMap(null);
    }

    removeAllCircle() {
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].setMap(null);
        }
    }

    addPolygon(coords, options) {
        var polygon = new naver.maps.Polygon({
            paths: coords,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight,
            fillColor: options.fillColor,
            fillOpacity: options.fillOpacity

        });
        polygon.setMap(this.map);
    }

    addListener(markerId, eventName, handler) {
        this.markers[markerId].addListener(eventName, handler);
    }
};
