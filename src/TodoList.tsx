import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
  List,
  ListItemText,
} from "@mui/material";

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
    setTodos(todos.filter((todo) => todo.id !== id));
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
    const newText =
      prompt("Edit todo:", todos.find((todo) => todo.id === id)?.text || "") ||
      "";
    if (newText.trim() !== "") {
      handleEditTodo(id, newText);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", bgcolor: "#808080" }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper
          sx={{
            paddingInline: "20px",
            paddingBlock: "30px",
            borderRadius: "8px",
          }}
          elevation={3}
        >
          <Typography variant="h4" textAlign="center">
            TodoList
          </Typography>

          <Box sx={{ paddingInline: "50px", paddingBlock: "20px" }}>
            <List sx={{ display: "grid", gap: "10px" }}>
              {todos.map((todo) => (
                <ListItemText key={todo.id}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">{todo.text}</Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleToggleEdit(todo.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </ListItemText>
              ))}
            </List>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                type="text"
                label="Add todo item"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <Button variant="contained" onClick={handleAddTodo}>
                Add
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TodoList;
