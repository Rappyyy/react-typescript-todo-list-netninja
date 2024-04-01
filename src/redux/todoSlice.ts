import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Todo {
  id: number;
  text: string;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return state.filter(todo => todo.id !== action.payload);
    },
    editTodo(state, action: PayloadAction<{ id: number; newText: string }>) {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    searchTodos(state, action: PayloadAction<string>) {
      
      return state.filter(todo => todo.text.toLowerCase().includes(action.payload.toLowerCase()));
    },
  },
});

export const { setTodos, addTodo, deleteTodo, editTodo, searchTodos } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
