import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import NewTodo from '../NewTodo/NewTodo';

export const Header = ({ addTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <NewTodo addTodo={addTodo} />
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
