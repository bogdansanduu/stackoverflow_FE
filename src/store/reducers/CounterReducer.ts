import {CounterAction, CounterState} from "../types/CounterReducerTypes";

const INITIAL_STATE: CounterState = {
    counter: 0,
}

const CounterReducer = (state = INITIAL_STATE, action: CounterAction) => {
    switch (action.type) {
        case 'INCREMENT':
            return {counter: state.counter + 1};
        case 'DECREMENT':
            return {counter: state.counter - 1};
        default:
            return state;
    }
};

export default CounterReducer;