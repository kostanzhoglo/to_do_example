import React from 'react'

export default props =>
  <form>
    <input
      type='text'
      autoFocus
      value={props.currentTodo}
      onChange={props.handleNewTodoChange}
      className="new-todo"
      placeholder="What needs to be done?"/>
    <input
      type='text'
      // autoFocus
      className="my-dad"
      placeholder="Whatchoo doin'?"/>
  </form>
