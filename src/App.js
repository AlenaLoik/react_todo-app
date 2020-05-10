import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

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

  handleRemuve = (id) => {
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

  handleRemuveCompleted = () => {
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

  render() {
    let todoView = [];

    switch (this.state.showParam) {
      case 'active':
        todoView = [...this.state.todos].filter(todo => (
          !todo.completed
        ));
        break;
      case 'completed':
        todoView = [...this.state.todos].filter(todo => (
          todo.completed
        ));
        break;
      default:
        todoView = [...this.state.todos];
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>
        {(this.state.todos.length)
          ? (
            <>
              <section className="main">
                <input
                  onClick={this.toggleCompleteAll}
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoList
                  todos={todoView}
                  remuve={this.handleRemuve}
                  toggleComplete={this.toggleComplete}
                  handleDobleClick={this.handleDobleClick}
                  editTodo={this.editTodo}
                />
              </section>

              <footer className="footer">
                <span className="todo-count">
                  {this.state.todos.filter(todo => (
                    !todo.completed)).length}
                  item left
                </span>
                <TodosFilter updateTodosToShow={this.updateTodosToShow} />
                {
                  (this.state.todos.filter(todo => (
                    todo.completed)).length)
                    ? (
                      <button
                        onClick={this.handleRemuveCompleted}
                        type="button"
                        className="clear-completed"
                      >
                        Clear completed
                      </button>
                    )
                    : ('')
                }
              </footer>
            </>
          ) : ''}
      </section>
    );
  }
}

export default App;
