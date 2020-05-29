declare class StreamContainer {
    private _streams;
    private _checkStream;
    subscribe(streamKey: string, callback: () => void): void;
    publish(streamKey: string, newValue: any): void;
    getLastValue(streamKey: string): any;
}
declare const _default: StreamContainer;
export default _default;
