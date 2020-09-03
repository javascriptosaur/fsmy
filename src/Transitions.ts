import IState from "./IState";
export declare type Transitions<T extends string | number> = {
    [S in T]: {
        name?: string;
        to: T[];
        state: IState<T>;
    };
};