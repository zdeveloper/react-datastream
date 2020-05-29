class Stream {
  private _value: any = null;
  private _subscribers = [];

  getValue(): any {
    return this._value;
  }

  isEmpty(): boolean {
    return this.getValue() === null;
  }

  publish(newValue: any) {
    this._value = newValue;
    for (var i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i](this._value);
    }
  }

  subscribe(callback: () => void, replayLastPublish) {
    this._subscribers.push(callback);

    if (replayLastPublish && !this.isEmpty()) {
      this.publish(this.getValue())
    }
  }
}

class StreamContainer {
  private _streams = [];

  private _checkStream(streamKey: string) {
    var existsFlag = streamKey in this._streams;
    if (!existsFlag) {
      this._streams[streamKey] = new Stream();
    }
  }

  subscribe(streamKey: string, callback: () => void, replayLastPublish: boolean = false): void {
    this._checkStream(streamKey);
    this._streams[streamKey].subscribe(callback, replayLastPublish);
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
