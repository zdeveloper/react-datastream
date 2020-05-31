declare class StreamContainer {
    private _streams;
    private _streamExists;
    private _upsertStream;
    /**
   * Subscribes to stream
   * @param  {Number} streamKey stream name
   * @param  {Function} callback callback for value
   * @param  {Boolean} replayLastPublish publishes exisiting value right away
   * @return {Function} unsubscribe hook
   */
    subscribe(streamKey: string, callback: () => void, replayLastPublish?: boolean): () => void;
    publish(streamKey: string, newValue: any): void;
    getLastValue(streamKey: string): any;
}
declare const _default: StreamContainer;
export default _default;
