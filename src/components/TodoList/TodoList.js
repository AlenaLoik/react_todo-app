import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoList extends Component {
  state = {
    content: '',
    submitEditing: true,
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value.trim(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editTodo(this.state.content);
    this.setState({
      submitEditing: false,
    });
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todo => (
          <li
            key={todo.id}
            className={(todo.editing && this.state.submitEditing)
              ? 'editing' : ''}
          >
            <form
              onSubmit={this.handleSubmit}
            >
              <div
                className={todo.completed ? 'completed' : 'view'}

              >
                <input
                  onClick={() => {
                    this.props.toggleComplete(todo.id);
                  }}
                  checked={todo.completed}
                  type="checkbox"
                  className="toggle"
                  id={`todo-${todo.id}`}
                />
                <label
                  htmlFor={`edit-${todo.id}`}
                  onDoubleClick={() => {
                    this.props.handleDobleClick(todo);
                    this.setState(() => ({
                      content: todo.content,
                      submitEditing: true,
                    }));
                  }}
                >
                  {todo.content}
                </label>
                <button
                  onClick={() => {
                    this.props.remuve(todo.id);
                  }}
                  type="button"
                  className="destroy"
                />
              </div>

              <input
                type="text"
                className="edit"
                id={`edit-${todo.id}`}
                value={this.state.content}
                onChange={this.handleChange}
                onKeyUp={(e) => {
                  if (e.key === 'Escape') {
                    this.setState({ submitEditing: false });
                  }
                }
                }
              />
            </form>
          </li>
        ))
        }
      </ul>
    );
  }
}

export default TodoList;

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
  handleDobleClick: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
