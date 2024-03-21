import React, { useState } from 'react'

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {

  const [todos, setTodos] = useState<item[]>([
    {id: 1, text: "Learn Typescript with Georgie", completed: false},
    {id: 2, text: "Build Todo List App", completed: false},
  ]) 

  return (
    <div className='main-container'>
      <h1>TodoList</h1>
      <ul>
       {todos.map((todo) => (
        <li>{todo.text}</li>
       ))}
      </ul>
      <input type="text" placeholder='Add todo item' />
      <button>Add</button>
    </div>
  )
}

export default TodoList
