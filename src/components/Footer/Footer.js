import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer = ({
  todos,
  updateTodosToShow,
  handleRemoveCompleted,
  itemLeft,
}) => (
  <footer className="footer">
    <span className="todo-count">
      {itemLeft}
      {' '}
      item left
    </span>
    <TodosFilter updateTodosToShow={updateTodosToShow} />
    {
      (todos.filter(todo => (todo.completed)).length)
        ? (
          <button
            onClick={handleRemoveCompleted}
            type="button"
            className="clear-completed"
          >
            Clear completed
          </button>
        )
        : ('')
    }
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  updateTodosToShow: PropTypes.func.isRequired,
  handleRemoveCompleted: PropTypes.func.isRequired,
  itemLeft: PropTypes.number.isRequired,
};
