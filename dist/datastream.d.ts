export declare type Stream = {
    unsubscribe: () => void;
    getLastValue: () => any;
};
declare class StreamContainer {
    private _streams;
    private _upsertStream;
    /**
   * Subscribes to stream
   * @param  {Number} streamKey stream name
   * @param  {Function} callback callback for value
   * @param  {Boolean} replayLastPublish publishes exisiting value right away
   * @return {Stream} returns a stream object
   */
    subscribe(streamKey: string, callback?: (value?: any) => void, replayLastPublish?: boolean): Stream;
    publish(streamKey: string, newValue: any): void;
    getLastValue(streamKey: string): any;
    /**
     * ONLY use for testing or if you know what are doing
     * This will wipe all subscriptions callbacks on all streams
    */
    resetAllStreams(): void;
}
declare const _default: StreamContainer;
export default _default;
