declare class StreamContainer {
    private _streams;
    private _streamExists;
    private _upsertStream;
    subscribe(streamKey: string, callback: () => void, replayLastPublish?: boolean): () => void;
    publish(streamKey: string, newValue: any): void;
    getLastValue(streamKey: string): any;
}
declare const _default: StreamContainer;
export default _default;
