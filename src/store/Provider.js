import React from 'react';
import { useTodo } from './todoReducer';

export const TodoContext = React.createContext();

export function ContextsProvider(props) {
  return (
    <TodoContext.Provider value={useTodo()}>
      {props.children}
    </TodoContext.Provider>
  );
}