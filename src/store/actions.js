
import React from 'react';
import { TodoContext } from './Provider';

export function useTodoAction() {
    const { dispatch } = React.useContext(TodoContext);
  
    function addTodo(title) {
      dispatch({
        type: 'add',
        payload: title,
      });
    }
  
    function toggleTodo(todo) {
      dispatch({
        type: todo.done ? 'not_complete' : 'complete',
        payload: todo.id,
      });
    }
  
    function deleteTodo(todo) {
      dispatch({
        type: 'delete',
        payload: todo.id,
      });
    }
  
    return {
      toggleTodo,
      addTodo,
      deleteTodo,
    };
  }