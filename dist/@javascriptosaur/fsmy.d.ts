// Generated by dts-bundle v0.7.3

declare module '@javascriptosaur/fsmy' {
    export { default as IState } from '@javascriptosaur/fsmy/IState';
    export { default as FSM } from '@javascriptosaur/fsmy/FSM';
}

declare module '@javascriptosaur/fsmy/IState' {
    import { FSM } from "@javascriptosaur/fsmy/";
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
}

declare module '@javascriptosaur/fsmy/FSM' {
    import { Transitions } from "@javascriptosaur/fsmy/Transitions";
    export default class FSM<T extends string | number> {
        onEnterState: (obj?: {
            from: T;
            to: T;
            data?: {};
            fsm: FSM<T>;
        }) => Promise<void> | void;
        onLeaveState: (obj?: {
            from: T;
            to: T;
            data?: {};
            fsm: FSM<T>;
        }) => Promise<void> | void;
        getStateName: (key: T) => string;
        constructor(_transitions: Transitions<T>, initState: T);
        goto(state: T, data?: {}): void;
        dispose(): void;
        transition(to: T, data?: {}): Promise<void>;
        getCurrentState(): T;
        canTransition(state: T): boolean;
    }
}

declare module '@javascriptosaur/fsmy/' {
    export { default as IState } from '@javascriptosaur/fsmy/IState';
    export { default as FSM } from '@javascriptosaur/fsmy/FSM';
}

declare module '@javascriptosaur/fsmy/Transitions' {
    import IState from "@javascriptosaur/fsmy/IState";
    export type Transitions<T extends string | number> = {
        [S in T]: {
            name?: string;
            to: T[];
            state: IState<T>;
        };
    };
}

