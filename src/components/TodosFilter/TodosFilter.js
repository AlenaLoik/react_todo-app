import React from 'react';
import './TodosFilter.css';
import PropTypes from 'prop-types';

export const TodosFilter = ({ updateTodosToShow }) => {
  const statuses = ['all', 'active', 'completed'];

  return (
    <ul className="filters">
      {statuses.map(status => (
        <li>
          <a
            href={`#/${status}`}
            onClick={() => (updateTodosToShow(status))}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};

TodosFilter.propTypes = {
  updateTodosToShow: PropTypes.func.isRequired,
};
