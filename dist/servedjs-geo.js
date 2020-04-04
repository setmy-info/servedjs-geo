/*!
 * MIT License
 *
 * Copyright (c) 2017-2020 Imre Tabur <imre.tabur@eesti.ee>
 */
"use strict";

(function (global) {

    var jsdi = global.jsdi = global.jsdi || {};

    jsdi.service("$geo", function () {
        return {
            DEGREE_METERS: 111134.0,
            paths: {},
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
                var path = {
                    points: pointsArray,
                    end: pointsArray[pointsArray.size - 1],
                    calculations: {
                        length: 0,
                        middlePosition: -1,
                        middle: null
                    },
                    travelAndCalc: function () {
                        var i, previous, current;
                        previous = this.points[0];
                        for (i = 1; i < this.points.length; i++) {
                            current = this.points[i];
                        }
                    },
                    reArange: function (beginPosition, endPosition) {
                        var i, increase, direction = endPosition - beginPosition, j = 0, newArray = [];
                        if (beginPosition < endPosition) {
                            i = beginPosition;
                            increase = 1;
                        } else {
                            i = endPosition;
                            increase = -1;
                        }
                        for (; (direction > 0 && i <= endPosition) || (direction < 0 && i >= endPosition); i = i + increase, j++) {
                            newArray[j] = this.points[i];
                        }
                        this.end = newArray[newArray.size - 1];
                        this.points = newArray;
                    }
                };
                return path;
            },
            addPath: function (pathName, pathArray) {
                var path = this.newPath(pathArray);
                path.name = pathName;
                this.paths[pathName] = path;
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
