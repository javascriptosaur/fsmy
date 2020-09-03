# fsmy
Simple and pragmatic Finite State Machine designed for TypeScript

## Documentation
### Installation
```
npm i @javascriptosaur/fsmy
```
### Example
```
import { FSM } from '@javascriptosaur/fsmy';

let timerId;

enum State {
    Init,
    Start,
    Idle,
    Stop,
    Stopped,
}

const fsm = new FSM({
    [State.Init]: {
        to: [State.Start],
        state: {
            onEnterStateStart:async function(){
                buttonStart.disabled = true;
                buttonStop.disabled = true;
                const speed = 10;
                await wheel.start(speed);
            },
            onEnterStateEnd: function () {
                buttonStart.disabled = false;
                buttonStop.disabled = true;
            }
        }
    },
    [State.Start]: {
        to: [State.Idle],
        state: {
            onEnterStateStart:async function(){
                buttonStart.disabled = true;
                buttonStop.disabled = true;
                const speed = 100;
                await wheel.start(100);
            },
            onEnterStateEnd: function () {
                fsm.transition(State.Idle);
            }
        }
    },
    [State.Idle]: {
        to: [State.Init, State.Stop],
        state: {
            onEnterStateStart:async function(){
                buttonStart.disabled = true;
                buttonStop.disabled = false;
                timerId = setTimeout(()=>{
                    fsm.transition(State.Init);
                },10000)
            },
            onLeaveStateStart: function () {
                clearTimeout(timerId);
            }
        }
    },
    [State.Stop]: {
        to: [State.Stopped],
        state: {
            onEnterStateStart:async function(){
                buttonStart.disabled = true;
                buttonStop.disabled = true;
                await wheel.stop(Math.floor(Math.random() * whell.totalSegments));
            },
            onEnterStateEnd: function () {
                fsm.transition(State.Stopped);
            }
        }
    },
    [State.Stopped]: {
        to: [State.Start],
        state: {
            onEnterStateStart:async function(){
                buttonStart.disabled = false;
                buttonStop.disabled = true;
            }
        }
    },
}, State.Init);

fsm.getStateName = function (key) {
    return State[key];
}
```
## License
MIT