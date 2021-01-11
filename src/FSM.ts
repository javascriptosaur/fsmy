import { Transitions } from "./Transitions";

export default class FSM<T extends string | number>{
    private _currentState: T;
    private _transitionInProcess: boolean = false;
    onEnterState: (obj?: { from: T, to: T, data?: {}, fsm:FSM<T> }) => Promise<void> | void;
    onLeaveState: (obj?: { from: T, to: T, data?: {}, fsm:FSM<T> }) => Promise<void> | void;
    getStateName: (key: T) => string;

    constructor(private _transitions: Transitions<T>, initState: T) {
        this.transition(initState);
    }

    goto(state: T, data?: {}) {
        this._currentState = null;
        this.transition(state, data);
    }

    dispose(){
        this.onEnterState = null;
        this.onLeaveState = null;
        this.getStateName = null;
        this._transitions = null;
    }

    async transition(to: T, data?: {}) {
        const from = this._currentState;
        const fromName = this.getStateName && this.getStateName(from) || from;
        const toName = this.getStateName && this.getStateName(to) || to;

        if (this._transitionInProcess) {
            console.error(`transition in process to ${fromName}`);
            return;
        }
        if (this.canTransition(to)) {
            this._transitionInProcess = true;

            this._currentState = to;

            console.log(`transition from ${fromName} to ${toName}`);

            const { onLeaveStateStart, onLeaveStateEnd } = this._transitions[from]?.state || {};
            const { onEnterStateStart, onEnterStateEnd } = this._transitions[to]?.state || {};
            const { onEnterState, onLeaveState } = this;

            await Promise.all([onLeaveState && onLeaveState({ from, to, data, fsm:this }), onLeaveStateStart && onLeaveStateStart({ from, to, data, fsm:this })]);
            onLeaveStateEnd && await onLeaveStateEnd({ from, to, data, fsm:this })
            await Promise.all([onEnterState && onEnterState({ from, to, data, fsm:this }), onEnterStateStart && onEnterStateStart({ from, to, data, fsm:this })]);
            onEnterStateEnd && await onEnterStateEnd({ from, to, data, fsm:this });

            this._transitionInProcess = false;
        } else {
            console.error(`Can't transition from ${fromName} to ${toName}`);
        }
    }

    getCurrentState(): T {
        return this._currentState;
    }

    canTransition(state: T): boolean {
        return !this._currentState || this._transitions[this._currentState].to.indexOf(state) > -1
    }
}