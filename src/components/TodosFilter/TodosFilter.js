import React from 'react';
import './TodosFilter.css';
import PropTypes from 'prop-types';

export const TodosFilter = ({ updateTodosToShow }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        onClick={() => (updateTodosToShow('all'))}
      >
        All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        onClick={() => (updateTodosToShow('active'))}
      >
        Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        onClick={() => (updateTodosToShow('completed'))}
      >
        Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  updateTodosToShow: PropTypes.func.isRequired,
};
