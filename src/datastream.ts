class Stream {
  private _key = "";
  private _value: any;
  private _subscribers = [];

  constructor(key: string) {
    this._key = key;
  }

  getValue() {
    return this._value;
  }

  getKey() {
    return this._key;
  }

  publish(newValue: any) {
    this._value = newValue;
    for (var i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i](this._value);
    }
  }

  subscribe(callback: () => void) {
    this._subscribers.push(callback);
  }
}

class StreamContainer {
  private _streams = [];

  private _checkStream(streamKey: string) {
    var existsFlag = streamKey in this._streams;
    if (!existsFlag) {
      this._streams[streamKey] = new Stream(streamKey);
    }
  }

  subscribe(streamKey: string, callback: () => void): void {
    this._checkStream(streamKey);
    this._streams[streamKey].subscribe(callback);
  }

  publish(streamKey: string, newValue: any): void {
    this._checkStream(streamKey);
    this._streams[streamKey].publish(newValue);
  }

  getLastValue(streamKey: string): any {
    this._checkStream(streamKey);
    this._streams[streamKey].getValue();
  }
}

export default new StreamContainer();
