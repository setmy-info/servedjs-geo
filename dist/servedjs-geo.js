/*!
 * MIT License
 *
 * Copyright (c) 2017-2019 Imre Tabur <imre.tabur@eesti.ee>
 */
"use strict";

(function (global) {

    var jsdi = global.jsdi = global.jsdi || {};

    jsdi.service("$geo", function () {
        return {
            DEGREE_METERS: 111134.0,
            newWatcher: function (watcherSuccess, watcherError, options) {
                return {
                    success: function (position) {
                        watcherSuccess({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            altitude: position.coords.altitude,
                            altitudeAccuracy: position.coords.altitudeAccuracy,
                            speed: position.coords.speed,
                            heading: position.coords.heading,
                            timestamp: position.timestamp
                        });
                    },
                    error: watcherError,
                    options: options || {
                        enableHighAccuracy: true,
                        maximumAge: 0
                    },
                    watchId: null,
                    start: function () {
                        this.watchId = navigator.geolocation.watchPosition(this.success, this.error, this.options);
                    },
                    stop: function () {
                        navigator.geolocation.clearWatch(this.watchId);
                        this.watchId = null;
                    }
                };
            },
            newPath: function (pointsArray) {
                return {
                    points: pointsArray,
                    init: function () {
                        this.travelAndCalc();
                    },
                    travelAndCalc: function () {
                        var i, previous, current;
                        previous = this.points[0];
                        for (i = 1; i < this.points.length; i++) {
                            current = this.points[i];
                        }
                    }
                };
            },
            pointInMeters: function (point) {
                return {
                    latitude: this.DEGREE_METERS * point.latitude,
                    longitude: this.calcLongitudeMetersCoeficent(point.latitude) * point.longitude
                };
            },
            calcLongitudeMetersCoeficent: function (latitude) {
                return this.DEGREE_METERS * this.calcLatitudeCoeficent(latitude);
            },
            calcLatitudeCoeficent: function (latitude) {
                return Math.cos(this.calcDegreeRadians(latitude));
            },
            calcDegreeRadians: function (degree) {
                return (Math.PI * degree) / 180.0;
            }
        };
    });

})(typeof window === 'undefined' ? global : window);
