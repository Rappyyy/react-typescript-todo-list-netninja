import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Typescript with Georgie" },
    { id: 2, text: "Build Todo List App" },
  ]);

  const [input, setInput] = useState<string>("");

  const handleAddTodo = () => {
    if (input.trim() === "") return; // Prevent adding empty todos
    const newTodo: Todo = { id: Date.now(), text: input.trim() };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText.trim() };
        }
        return todo;
      })
    );
  };

  return (
    <div className='main-container'>
      <h1>TodoList</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleEditTodo(todo.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder='Add todo item'
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default TodoList;
