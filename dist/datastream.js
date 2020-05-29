"use strict";
exports.__esModule = true;
var Stream = /** @class */ (function () {
    function Stream() {
        this._value = null;
        this._subscribers = [];
    }
    Stream.prototype.getValue = function () {
        return this._value;
    };
    Stream.prototype.isEmpty = function () {
        return this.getValue() === null;
    };
    Stream.prototype.publish = function (newValue) {
        this._value = newValue;
        for (var i = 0; i < this._subscribers.length; i++) {
            this._subscribers[i](this._value);
        }
    };
    Stream.prototype.subscribe = function (callback, replayLastPublish) {
        this._subscribers.push(callback);
        if (replayLastPublish && !this.isEmpty()) {
            this.publish(this.getValue());
        }
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
            this._streams[streamKey] = new Stream();
        }
    };
    StreamContainer.prototype.subscribe = function (streamKey, callback, replayLastPublish) {
        if (replayLastPublish === void 0) { replayLastPublish = false; }
        this._checkStream(streamKey);
        this._streams[streamKey].subscribe(callback, replayLastPublish);
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
