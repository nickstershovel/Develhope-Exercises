// Action Types
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const EDIT_TODO = 'EDIT_TODO';

// Action Creators
let nextTodoId = 0;

const addTodo = (title) => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        title,
        completed: false
    }
});

const removeTodo = (id) => ({
    type: REMOVE_TODO,
    payload: { id }
});

const editTodo = (id, title) => ({
    type: EDIT_TODO,
    payload: { id, title }
});

// Reducer
const initialState = [];

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.payload.id);
        case EDIT_TODO:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, title: action.payload.title }
                    : todo
            );
        default:
            return state;
    }
};

export default todosReducer;