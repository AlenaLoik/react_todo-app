import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, remuve, toggleComplete }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <div className={todo.completed ? 'completed' : 'view'}>
          <input
            checked={todo.completed}
            onClick={() => {
              toggleComplete(todo.id);
            }}
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label htmlFor={`todo-${todo.id}`}>{todo.content}</label>
          <button
            onClick={() => {
              remuve(todo.id);
            }}
            type="button"
            className="destroy"
          />
        </div>
        <input type="text" className="edit" />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  remuve: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
