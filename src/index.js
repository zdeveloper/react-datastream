class Stream {
  _key = "";
  _state = {};
  _subscribers = [];

  constructor(key) {
    this._key = key;
  }

  getState() {
    return this._state;
  }

  getKey() {
    return this._key;
  }

  publish(newState) {
    this._state = newState;
    for (var i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i](this._state);
    }
  }

  subscribe(callback) {
    this._subscribers.push(callback);
  }
}

class StreamContainer {
  _streams = [];

  _checkStream(streamKey) {
    var existsFlag = streamKey in this._streams;
    if (!existsFlag) {
      this._streams[streamKey] = new Stream(streamKey);
    }
  }

  subscribe(streamKey, callback) {
    this._checkStream(streamKey);
    this._streams[streamKey].subscribe(callback);
  }

  publish(streamKey, newState) {
    this._checkStream(streamKey);
    this._streams[streamKey].publish(newState);
  }

  getState(streamKey, newState) {
    this._checkStream(streamKey);
    this._streams[streamKey].getState();
  }
}

export default new StreamContainer();
