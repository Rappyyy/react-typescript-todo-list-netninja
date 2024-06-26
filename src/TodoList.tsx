import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  searchTodos,
  selectTodos,
  setTodos, // Import setTodos action
} from "./redux/todoSlice";

export const TodoList = () => {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      dispatch(setTodos(data)); // Dispatch setTodos action here
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (input.trim() === "") return;
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input.trim() }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const newTodo = await response.json();
      dispatch(addTodo(newTodo));
      setInput("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = async (id: number, newText: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText.trim() }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      dispatch(editTodo({ id, newText }));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleToggleEdit = (id: number) => {
    const newText =
      prompt("Edit todo:", todos.find((todo) => todo.id === id)?.text) || "";
    if (newText.trim() !== "") {
      handleEditTodo(id, newText);
    }
  };

  const handleSearch = () => {
    dispatch(searchTodos(searchQuery));
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

          <Box
            sx={{
              paddingInline: "50px",
              paddingBlock: "20px",
              marginTop: "10px",
            }}
          >
            <TextField
              type="text"
              label="Search todo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ ml: 2, mb: 4 }}
            >
              Search
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Todo</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell>{todo.id}</TableCell>
                      <TableCell>{todo.text}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleToggleEdit(todo.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ ml: 3 }}
                          variant="contained"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                sx={{ mt: 2 }}
                type="text"
                label="Add todo "
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={handleAddTodo}
              >
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
