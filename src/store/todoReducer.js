import React from 'react';

export function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        data: [
          ...state.data,
          { name: action.payload, done: false, id: state.data.length + 1 },
        ],
      };
    case 'delete':
      return state.data.filter((todo) => todo.id !== action.payload);
    case 'complete':
      console.log('as');
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.payload) {
            todo.done = true;
            return todo;
          }
          return todo;
        }),
      };
    case 'not_complete':
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === action.payload) {
            todo.done = false;
            return todo;
          }
          return todo;
        }),
      };
    default:
      return {
        data: [],
        isLoading: false,
        error: false,
      };
  }
}

export function useTodo(initialState = []) {
  const [state, dispatch] = React.useReducer(todoReducer, {
    data: initialState,
    isLoading: false,
    error: false,
  });

  return {
    state,
    dispatch,
  };
}
