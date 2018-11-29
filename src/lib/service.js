import axios from 'axios';

export const saveTodo = (todo) =>
  axios.post('http://localhost:3030/api/todos', todo)
  // returns {data} from the api (eventually)
  // that {data} Object will be used in TodoApp.js, handleTodoSubmit()...

export const loadTodos = () =>
  axios.get('http://localhost:3030/api/todos')

export const destroyTodo = (id) =>
  axios.delete(`http://localhost:3030/api/todos/${id}`)

export const updateTodo = (todo) =>
  axios.put(`http://localhost:3030/api/todos/${todo.id}`, todo) // todo at end is the BODY of the REQUEST
