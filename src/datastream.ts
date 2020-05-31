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

  /*returns unsubscribe hook */
  subscribe(callback: () => void, replayLastPublish: boolean): () => void {
    this._subscribers.push(callback);

    if (replayLastPublish && !this.isEmpty()) {
      this.publish(this.getValue())
    }

    return (() => {
      this._unsubscribe(callback);
    })
  }

  private _unsubscribe(callback: () => void) {
    const index = this._subscribers.indexOf(callback)
    if (index > -1) {
      this._subscribers.splice(index, 1);
    }
  }
}

class StreamContainer {
  private _streams = [];

  private _streamExists(streamKey: string) {
    return streamKey in this._streams;
  }

  private _upsertStream(streamKey: string) {
    var existsFlag = streamKey in this._streams;
    if (!existsFlag) {
      this._streams[streamKey] = new Stream();
    }
  }

  /*returns unsubscribe hook */
  subscribe(streamKey: string, callback: () => void, replayLastPublish: boolean = true): () => void {
    this._upsertStream(streamKey);
    return this._streams[streamKey].subscribe(callback, replayLastPublish);
  }

  publish(streamKey: string, newValue: any): void {
    this._upsertStream(streamKey);
    this._streams[streamKey].publish(newValue);
  }

  getLastValue(streamKey: string): any {
    this._upsertStream(streamKey);
    this._streams[streamKey].getValue();
  }
}

export default new StreamContainer();
