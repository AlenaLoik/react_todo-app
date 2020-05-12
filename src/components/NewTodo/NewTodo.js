import React, { Component } from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    content: '',
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value.trim(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const id = +Date.now();
    const completed = false;
    const todo = {
      content, id, completed,
    };

    if (content) {
      this.props.addTodo(todo);

      this.setState(prevState => ({
        content: '',
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.content}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
