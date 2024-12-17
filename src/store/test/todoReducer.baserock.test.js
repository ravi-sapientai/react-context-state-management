const React = require('react');
const { todoReducer, useTodo } = require('../../../src/store/todoReducer');

describe('todoReducer', () => {
  const initialState = {
    data: [],
    isLoading: false,
    error: false,
  };

  it('should add a new todo', () => {
    const action = { type: 'add', payload: 'New Todo' };
    const newState = todoReducer(initialState, action);
    expect(newState.data).toHaveLength(1);
    expect(newState.data[0]).toEqual({
      name: 'New Todo',
      done: false,
      id: 1,
    });
  });

  it('should delete a todo', () => {
    const state = {
      ...initialState,
      data: [{ id: 1, name: 'Todo 1', done: false }],
    };
    const action = { type: 'delete', payload: 1 };
    const newState = todoReducer(state, action);
    expect(newState.data).toHaveLength(0);
  });

  it('should mark a todo as complete', () => {
    const state = {
      ...initialState,
      data: [{ id: 1, name: 'Todo 1', done: false }],
    };
    const action = { type: 'complete', payload: 1 };
    const newState = todoReducer(state, action);
    expect(newState.data[0].done).toBe(true);
  });

  it('should mark a todo as not complete', () => {
    const state = {
      ...initialState,
      data: [{ id: 1, name: 'Todo 1', done: true }],
    };
    const action = { type: 'not_complete', payload: 1 };
    const newState = todoReducer(state, action);
    expect(newState.data[0].done).toBe(false);
  });

  it('should return default state for unknown action', () => {
    const action = { type: 'unknown' };
    const newState = todoReducer(initialState, action);
    expect(newState).toEqual({
      data: [],
      isLoading: false,
      error: false,
    });
  });
});

describe('useTodo', () => {
  it('should initialize with empty state', () => {
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockReturnValue([
      { data: [], isLoading: false, error: false },
      jest.fn(),
    ]);

    const result = useTodo();
    expect(result.state).toEqual({
      data: [],
      isLoading: false,
      error: false,
    });
    expect(typeof result.dispatch).toBe('function');

    useReducerSpy.mockRestore();
  });

  it('should initialize with provided initial state', () => {
    const initialState = [{ id: 1, name: 'Initial Todo', done: false }];
    const useReducerSpy = jest.spyOn(React, 'useReducer');
    useReducerSpy.mockReturnValue([
      { data: initialState, isLoading: false, error: false },
      jest.fn(),
    ]);

    const result = useTodo(initialState);
    expect(result.state).toEqual({
      data: initialState,
      isLoading: false,
      error: false,
    });
    expect(typeof result.dispatch).toBe('function');

    useReducerSpy.mockRestore();
  });
});