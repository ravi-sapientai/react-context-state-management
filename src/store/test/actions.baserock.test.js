const React = require('react');
const { TodoContext } = require('../../../src/store/Provider');
const { useTodoAction } = require('../../../src/store/actions');

// Mock the React.useContext function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useTodoAction', () => {
  let mockDispatch;
  let hookResult;

  beforeEach(() => {
    mockDispatch = jest.fn();
    React.useContext.mockReturnValue({ dispatch: mockDispatch });
    hookResult = useTodoAction();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return an object with toggleTodo, addTodo, and deleteTodo functions', () => {
    expect(hookResult).toHaveProperty('toggleTodo');
    expect(hookResult).toHaveProperty('addTodo');
    expect(hookResult).toHaveProperty('deleteTodo');
    expect(typeof hookResult.toggleTodo).toBe('function');
    expect(typeof hookResult.addTodo).toBe('function');
    expect(typeof hookResult.deleteTodo).toBe('function');
  });

  describe('addTodo', () => {
    test('should dispatch add action with correct payload', () => {
      const title = 'New Todo';
      hookResult.addTodo(title);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'add',
        payload: title,
      });
    });
  });

  describe('toggleTodo', () => {
    test('should dispatch complete action when todo is not done', () => {
      const todo = { id: 1, done: false };
      hookResult.toggleTodo(todo);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'complete',
        payload: todo.id,
      });
    });

    test('should dispatch not_complete action when todo is done', () => {
      const todo = { id: 1, done: true };
      hookResult.toggleTodo(todo);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'not_complete',
        payload: todo.id,
      });
    });
  });

  describe('deleteTodo', () => {
    test('should dispatch delete action with correct payload', () => {
      const todo = { id: 1 };
      hookResult.deleteTodo(todo);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'delete',
        payload: todo.id,
      });
    });
  });
});