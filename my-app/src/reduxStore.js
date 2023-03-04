import { createStore, combineReducers } from 'redux';
import counterReducer from './counterReducer';
import todosReducer from './todosReducer';


const rootReducer = combineReducers({
    counter: counterReducer,
    todos: todosReducer
});

// Create the store
const store = createStore(rootReducer);

const handleStateUpdate = () => {
    console.log('State updated:', store.getState());
};

// Subscribe to the store
const unsubscribe = store.subscribe(handleStateUpdate);

// Dispatch an INCREMENT action
store.dispatch(incrementCounter());

// Dispatch an ADD_TODO action
store.dispatch(addTodo('Buy groceries'));

// Unsubscribe from the store
unsubscribe();