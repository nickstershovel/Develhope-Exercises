import { createStore } from 'redux';
// Action Types
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const RESET_COUNTER = 'RESET_COUNTER';

// Action Creators
const incrementCounter = () => ({ type: INCREMENT_COUNTER });
const decrementCounter = () => ({ type: DECREMENT_COUNTER });
const resetCounter = () => ({ type: RESET_COUNTER });

// Reducer
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return { ...state, count: state.count + 1 };
        case DECREMENT_COUNTER:
            return { ...state, count: state.count - 1 };
        case RESET_COUNTER:
            return { ...state, count: 0 };
        default:
            return state;
    }
};

// Create the store
const store = createStore(counterReducer);

// Get the initial state of the store
console.log(store.getState()); // { count: 0 }

// Dispatch an INCREMENT action
store.dispatch(incrementCounter());

// Get the updated state of the store
console.log(store.getState()); // { count: 1 }
export default counterReducer;