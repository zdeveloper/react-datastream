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
    /*returns unsubscribe hook */
    Stream.prototype.subscribe = function (callback, replayLastPublish) {
        var _this = this;
        this._subscribers.push(callback);
        if (replayLastPublish && !this.isEmpty()) {
            this.publish(this.getValue());
        }
        return (function () {
            _this._unsubscribe(callback);
        });
    };
    Stream.prototype._unsubscribe = function (callback) {
        var index = this._subscribers.indexOf(callback);
        if (index > -1) {
            this._subscribers.splice(index, 1);
        }
    };
    return Stream;
}());
var StreamContainer = /** @class */ (function () {
    function StreamContainer() {
        this._streams = [];
    }
    StreamContainer.prototype._streamExists = function (streamKey) {
        return streamKey in this._streams;
    };
    StreamContainer.prototype._upsertStream = function (streamKey) {
        var existsFlag = streamKey in this._streams;
        if (!existsFlag) {
            this._streams[streamKey] = new Stream();
        }
    };
    /*returns unsubscribe hook */
    StreamContainer.prototype.subscribe = function (streamKey, callback, replayLastPublish) {
        if (replayLastPublish === void 0) { replayLastPublish = true; }
        this._upsertStream(streamKey);
        return this._streams[streamKey].subscribe(callback, replayLastPublish);
    };
    StreamContainer.prototype.publish = function (streamKey, newValue) {
        this._upsertStream(streamKey);
        this._streams[streamKey].publish(newValue);
    };
    StreamContainer.prototype.getLastValue = function (streamKey) {
        this._upsertStream(streamKey);
        this._streams[streamKey].getValue();
    };
    return StreamContainer;
}());
exports["default"] = new StreamContainer();
