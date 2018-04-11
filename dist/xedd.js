"use strict";
exports.__esModule = true;
var Stream = /** @class */ (function () {
    function Stream(key) {
        this._key = "";
        this._state = {};
        this._subscribers = [];
        this._key = key;
    }
    Stream.prototype.getState = function () {
        return this._state;
    };
    Stream.prototype.getKey = function () {
        return this._key;
    };
    Stream.prototype.publish = function (newState) {
        this._state = newState;
        for (var i = 0; i < this._subscribers.length; i++) {
            this._subscribers[i](this._state);
        }
    };
    Stream.prototype.subscribe = function (callback) {
        this._subscribers.push(callback);
    };
    return Stream;
}());
var StreamContainer = /** @class */ (function () {
    function StreamContainer() {
        this._streams = [];
    }
    StreamContainer.prototype._checkStream = function (streamKey) {
        var existsFlag = streamKey in this._streams;
        if (!existsFlag) {
            this._streams[streamKey] = new Stream(streamKey);
        }
    };
    StreamContainer.prototype.subscribe = function (streamKey, callback) {
        this._checkStream(streamKey);
        this._streams[streamKey].subscribe(callback);
    };
    StreamContainer.prototype.publish = function (streamKey, newState) {
        this._checkStream(streamKey);
        this._streams[streamKey].publish(newState);
    };
    StreamContainer.prototype.getState = function (streamKey, newState) {
        this._checkStream(streamKey);
        this._streams[streamKey].getState();
    };
    return StreamContainer;
}());
exports["default"] = new StreamContainer();
