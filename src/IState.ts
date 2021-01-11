import { FSM } from ".";

export default interface IState<T extends string | number> {
    onEnterStateStart?: (obj?: {
        from: T;
        to: T;
        data?: {};
        fsm: FSM<T>;
    }) => Promise<void> | void;
    onEnterStateEnd?: (obj?: {
        from: T;
        to: T;
        data?: {};
        fsm: FSM<T>;
    }) => Promise<void> | void;
    onLeaveStateStart?: (obj?: {
        from: T;
        to: T;
        data?: {};
        fsm: FSM<T>;
    }) => Promise<void> | void;
    onLeaveStateEnd?: (obj?: {
        from: T;
        to: T;
        data?: {};
        fsm: FSM<T>;
    }) => Promise<void> | void;
}