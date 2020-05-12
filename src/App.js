import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

class App extends Component {
  state = {
    todos: [],
    showParam: 'all',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  updateTodosToShow = (todoToShow) => {
    this.setState({ showParam: todoToShow });
  }

  handleRemove = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.id !== id
      )),
    }));
  }

  handleDobleClick = ({ id }) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        (todo.id !== id) ? ({
          ...todo, editing: false,
        }) : ({
          ...todo, editing: true,
        })
      )),
    }));
  }

  editTodo = (content) => {
    if (content) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => (
          (todo.editing) ? ({
            ...todo, content,
          }) : todo)),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => (
          !todo.editing
        )),
      }));
    }
  }

  handleRemoveCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        !todo.completed
      )),
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  toggleCompleteAll = () => {
    if (this.state.todos.every(todo => (todo.completed))) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  getTodos = (status) => {
    let todoView = [];
    const { todos } = this.state;

    switch (status) {
      case 'active':
        todoView = todos.filter(todo => (
          !todo.completed
        ));
        break;
      case 'completed':
        todoView = todos.filter(todo => (
          todo.completed
        ));
        break;
      default:
        todoView = todos;
    }

    return todoView;
  }

  render() {
    const { todos, showParam } = this.state;
    const todoView = this.getTodos(showParam);
    const itemLeft = todos.filter(todo => (
      !todo.completed)).length;

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        {(todos.length)
          ? (
            <>
              <section className="main">
                <input
                  onClick={this.toggleCompleteAll}
                  checked={!itemLeft}
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoList
                  todos={todoView}
                  remove={this.handleRemove}
                  toggleComplete={this.toggleComplete}
                  handleDobleClick={this.handleDobleClick}
                  editTodo={this.editTodo}
                />
              </section>
              <Footer
                itemLeft={itemLeft}
                todos={todos}
                updateTodosToShow={this.updateTodosToShow}
                handleRemoveCompleted={this.handleRemoveCompleted}
              />
            </>
          ) : ''}
      </section>
    );
  }
}

export default App;
