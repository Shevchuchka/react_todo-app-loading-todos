import { Todo } from '../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../api/todos';
import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  filterTodos: (filteredTodos: Todo[]) => void;
};

type Filters = 'all' | 'active' | 'completed';

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterTodos = () => {},
}) => {
  const [filterType, setFilterType] = useState<Filters>('all');

  const todosCount = (todosType: Filters): number => {
    const value = todosType === 'active' ? false : true;

    return todos.filter(todo => todo.completed === value).length;
  };

  const filterFunction = (filter: Filters) => {
    setFilterType(filter);

    switch (filter) {
      case 'all':
        getTodos().then(filterTodos);
        break;

      case 'active':
        getActiveTodos().then(filterTodos);
        break;

      case 'completed':
        getCompletedTodos().then(filterTodos);
        break;

      default:
        getTodos().then(filterTodos);
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount('active')} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'all',
          })}
          onClick={() => filterFunction('all')}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'active',
          })}
          onClick={() => filterFunction('active')}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'completed',
          })}
          onClick={() => filterFunction('completed')}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todosCount('completed') === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
