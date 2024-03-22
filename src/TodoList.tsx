import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

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

  const handleToggleEdit = (id: number) => {
    const newText = prompt("Edit todo:", todos.find(todo => todo.id === id)?.text || "") || "";
    if (newText.trim() !== "") {
      handleEditTodo(id, newText);
    }
  };

  return (
    <div className='main-container'>
      <Typography variant="h4">TodoList</Typography>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <Button variant="contained" onClick={() => handleToggleEdit(todo.id)}>Edit</Button>
            <Button variant="contained" onClick={() => handleDeleteTodo(todo.id)}>Delete</Button>
          </li>
        ))}
      </ul>
      <TextField
        type="text"
        label='Add todo item'
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <Button variant="contained" onClick={handleAddTodo}>Add</Button>
    </div>
  );
};

export default TodoList;
