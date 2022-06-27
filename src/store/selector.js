import React from 'react';
import { TodoContext } from './Provider';

export function useTodoState() {
    const { state } = React.useContext(TodoContext);
  
    const completed = state.data.filter((todo) => todo.done).length;
  
    return {
      todos: state.data,
      totalTodos: state.data.length,
      completedTodos: completed,
      todosLeft: state.data.length - completed,
    };
  }