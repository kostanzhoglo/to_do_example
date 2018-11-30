import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveTodo, loadTodos, destroyTodo, updateTodo } from '../lib/service';


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount () {
    loadTodos()
      .then(({ data }) => this.setState({
        todos: data
      }))
      .catch(() => this.setState({error: true}))
  }

  handleNewTodoChange (event) {
    this.setState({currentTodo: event.target.value})
  }

  handleDelete (id) {
    destroyTodo(id)
      .then(() => this.setState({
        todos: this.state.todos.filter(todo => todo.id !== id)
      }))
  }

  handleToggle (id) {
    const targetTodo = this.state.todos.find(todo => todo.id === id)
    const updated = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete
    }
    // OLD CODE.  REFACTORED BELOW using .map .
    // updateTodo(updated)
    //   .then(
    //     ({data}) => {
    //       debugger
    //       const targetIndex = this.state.todos.findIndex(
    //         todo => todo.id === data.id
    //       )
    //       const todos = [
    //         ...this.state.todos.slice(0, targetIndex),
    //         data,
    //         ...this.state.todos.slice(targetIndex + 1)
    //       ]
    //       this.setState({ todos: todos })
    //     }
    //   )
    updateTodo(updated)
      .then(
        ({data}) => {
          const todos = this.state.todos.map(
            todo => todo.id === data.id ? data : todo
          )
          this.setState({todos: todos})
        }
      )
  }

  handleTodoSubmit (event) {
    event.preventDefault()
    const newTodo = {name: this.state.currentTodo, isComplete: false}
    saveTodo(newTodo)
      // .then handles the PROMISE resolution from the ajax call.  takes the return value from that promise, and...
      .then(({data}) => this.setState({
        todos: this.state.todos.concat(data),
        currentTodo: ''
      }))
      .catch(() => this.setState({error: true}))
  }

  render () {
    const remaining = this.state.todos.filter(todo => !todo.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <h1>Todos</h1>
            {this.state.error ? <span className='error'>Uh oh!</span> : null}
            <TodoForm
              currentTodo={this.state.currentTodo}
              handleTodoSubmit={this.handleTodoSubmit}
              handleNewTodoChange={this.handleNewTodoChange}
            />
          </header>
          <section className="main">
          <Route
            path='/:filter?' // the ? makes this parameter optional. This Route will match the route url with any additional segment.
            render={({match}) =>
              <TodoList
                todos={this.state.todos}
                handleDelete={this.handleDelete}
                handleToggle={this.handleToggle}
              />
            }
          />
          </section>
          <Footer
            remaining={remaining}
          />
        </div>
      </Router>
    )
  }
}
