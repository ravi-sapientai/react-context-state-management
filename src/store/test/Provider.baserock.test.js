const React = require('react');
const { render } = require('@testing-library/react');
const { TodoContext, ContextsProvider } = require('../../../src/store/Provider');
require('@testing-library/jest-dom');

// Mock the useTodo hook
jest.mock('../../../src/store/todoReducer', () => ({
  useTodo: jest.fn()
}));

// Import the mocked useTodo after mocking
const { useTodo } = require('../../../src/store/todoReducer');

describe('ContextsProvider', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    useTodo.mockReturnValue({});
    render(<ContextsProvider />);
  });

  it('provides TodoContext with value from useTodo', () => {
    const mockTodoValue = { todos: [], addTodo: jest.fn() };
    useTodo.mockReturnValue(mockTodoValue);

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(TodoContext);
      return null;
    };

    render(
      <ContextsProvider>
        <TestComponent />
      </ContextsProvider>
    );

    expect(contextValue).toEqual(mockTodoValue);
  });

  it('renders children properly', () => {
    useTodo.mockReturnValue({});
    const { getByText } = render(
      <ContextsProvider>
        <div>Test Child</div>
      </ContextsProvider>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});