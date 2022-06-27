import React from 'react';
import './style.css';
import { useTodoState } from './store/selector';
import { useTodoAction } from './store/actions';


const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoAction();
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid gray',
    marginBottom: '3px',
  };

  return (
    <div style={style}>
      <span>
        <input
          type="checkbox"
          value={todo.done}
          onChange={() => toggleTodo(todo)}
        />
        {todo.name}
      </span>
      <button onClick={() => deleteTodo(todo)}>delete</button>
    </div>
  );
};

const TodoList = React.memo(() => {
  const { todos } = useTodoState();
  return (
    <div>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
});

export default function App() {
  const { addTodo } = useTodoAction();
  const [newTodoName, setNewTodoName] = React.useState('');
  const { completedTodos, totalTodos } = useTodoState();
  return (
    <div style={{ width: '300px', margin: '100px auto'}}>
      <span>
        <input
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button
          onClick={() => {
            addTodo(newTodoName);
            setNewTodoName('');
          }}
        >
          add
        </button>
        <br />
      </span>
      <br /> {completedTodos} / {totalTodos} <br />
      <TodoList />
    </div>
  );
}
