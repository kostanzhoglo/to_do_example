import axios from 'axios';

export const saveTodo = (todo) =>
  axios.post('http://localhost:3030/api/todos', todo)
  // returns {data} from the api (eventually)
  // that {data} Object will be used in TodoApp.js, handleTodoSubmit()...
