"use strict";
exports.__esModule = true;
var Stream = /** @class */ (function () {
    function Stream(key) {
        this._key = "";
        this._subscribers = [];
        this._key = key;
    }
    Stream.prototype.getValue = function () {
        return this._value;
    };
    Stream.prototype.getKey = function () {
        return this._key;
    };
    Stream.prototype.publish = function (newValue) {
        this._value = newValue;
        for (var i = 0; i < this._subscribers.length; i++) {
            this._subscribers[i](this._value);
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
    StreamContainer.prototype.publish = function (streamKey, newValue) {
        this._checkStream(streamKey);
        this._streams[streamKey].publish(newValue);
    };
    StreamContainer.prototype.getLastValue = function (streamKey) {
        this._checkStream(streamKey);
        this._streams[streamKey].getValue();
    };
    return StreamContainer;
}());
exports["default"] = new StreamContainer();
