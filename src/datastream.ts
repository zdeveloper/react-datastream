export type Stream = {
  unsubscribe: () => void;
  getLastValue: () => any;
}

class StreamInstance {
  private _defaultEmptyValue = null;
  private _value: any = this._defaultEmptyValue;
  private _subscribers = [];

  getValue(): any {
    return this._value;
  }

  resetValue(){
    this._value = this._defaultEmptyValue
  }

  isEmpty(): boolean {
    return this.getValue() === this._defaultEmptyValue;
  }

  publish(newValue: any) {
    this._value = newValue;
    for (var i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i](this._value);
    }
  }

  /*returns unsubscribe hook */
  subscribe(callback: (value?: any) => void, replayLastPublish: boolean): Stream {
    !!callback && this._subscribers.push(callback);

    if (replayLastPublish && !this.isEmpty()) {
      this.publish(this.getValue())
    }

    return ({
      unsubscribe: () => this._unsubscribe(callback),
      getLastValue: () => this.getValue()
    } as Stream)
  }

  private _unsubscribe(callback: () => void) {
    const index = this._subscribers.indexOf(callback)
    if (index > -1) {
      this._subscribers.splice(index, 1);
    }
  }
}

class StreamContainer {
  private _streams : StreamInstance[]= [];

  private _upsertStream(streamKey: string) {
    var existsFlag = streamKey in this._streams;
    if (!existsFlag) {
      this._streams[streamKey] = new StreamInstance();
    }
  }

  /**
 * Subscribes to stream
 * @param  {Number} streamKey stream name
 * @param  {Function} callback callback for value
 * @param  {Boolean} replayLastPublish publishes exisiting value right away
 * @return {Stream} returns a stream object
 */
  subscribe(streamKey: string, callback?: (value?: any) => void, replayLastPublish: boolean = true): Stream {
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

  /**
   * ONLY use for testing or if you know what are doing
   * This will wipe all subscriptions callbacks on all streams
  */
  resetAllStreams(){
    this._streams = []
  }
}

export default new StreamContainer();
