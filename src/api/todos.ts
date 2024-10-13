import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1583;
// export const USER_ID = 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getActiveTodos = () => {
  return getTodos().then(todos =>
    todos.filter(todo => todo.completed === false),
  );
};

export const getCompletedTodos = () => {
  return getTodos().then(todos =>
    todos.filter(todo => todo.completed === true),
  );
};
// Add more methods here
