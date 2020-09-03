export default interface IState<T> {
    onEnterStateStart?: (obj?: {
        from: T;
        to: T;
        data?: {};
    }) => Promise<void> | void;
    onEnterStateEnd?: (obj?: {
        from: T;
        to: T;
        data?: {};
    }) => Promise<void> | void;
    onLeaveStateStart?: (obj?: {
        from: T;
        to: T;
        data?: {};
    }) => Promise<void> | void;
    onLeaveStateEnd?: (obj?: {
        from: T;
        to: T;
        data?: {};
    }) => Promise<void> | void;
}