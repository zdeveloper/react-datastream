"use strict";
exports.__esModule = true;
var StreamInstance = /** @class */ (function () {
    function StreamInstance() {
        this._defaultEmptyValue = null;
        this._value = this._defaultEmptyValue;
        this._subscribers = [];
    }
    StreamInstance.prototype.getValue = function () {
        return this._value;
    };
    StreamInstance.prototype.resetValue = function () {
        this._value = this._defaultEmptyValue;
    };
    StreamInstance.prototype.isEmpty = function () {
        return this.getValue() === this._defaultEmptyValue;
    };
    StreamInstance.prototype.publish = function (newValue) {
        this._value = newValue;
        for (var i = 0; i < this._subscribers.length; i++) {
            this._subscribers[i](this._value);
        }
    };
    /*returns unsubscribe hook */
    StreamInstance.prototype.subscribe = function (callback, replayLastPublish) {
        var _this = this;
        !!callback && this._subscribers.push(callback);
        if (replayLastPublish && !this.isEmpty()) {
            this.publish(this.getValue());
        }
        return {
            unsubscribe: function () { return _this._unsubscribe(callback); },
            getLastValue: function () { return _this.getValue(); }
        };
    };
    StreamInstance.prototype._unsubscribe = function (callback) {
        var index = this._subscribers.indexOf(callback);
        if (index > -1) {
            this._subscribers.splice(index, 1);
        }
    };
    return StreamInstance;
}());
var StreamContainer = /** @class */ (function () {
    function StreamContainer() {
        this._streams = [];
    }
    StreamContainer.prototype._upsertStream = function (streamKey) {
        var existsFlag = streamKey in this._streams;
        if (!existsFlag) {
            this._streams[streamKey] = new StreamInstance();
        }
    };
    /**
   * Subscribes to stream
   * @param  {Number} streamKey stream name
   * @param  {Function} callback callback for value
   * @param  {Boolean} replayLastPublish publishes exisiting value right away
   * @return {Stream} returns a stream object
   */
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
    /**
     * ONLY use for testing or if you know what are doing
     * This will wipe all subscriptions callbacks on all streams
    */
    StreamContainer.prototype.resetAllStreams = function () {
        this._streams = [];
    };
    return StreamContainer;
}());
exports["default"] = new StreamContainer();
