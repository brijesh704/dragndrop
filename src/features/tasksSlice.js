import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    todo: [],
    doing: [],
    done: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.todo.push(action.payload);
    },
    moveTask: (state, action) => {
      const { from, to, taskId } = action.payload;

      // // Remove task from the source column
      // const taskIndex = state[from].findIndex((task) => task.id === taskId);
      // const [task] = state[from].splice(taskIndex, 1);

      // // Add task to the destination column
      // state[to].push(task);
      // Find the task to move
      const taskToMove = state[from].find((task) => task.id === taskId);
      if (!taskToMove) {
        console.error("Task not found in the source column");
        return;
      }

     
      state[from] = state[from].filter((task) => task.id !== taskId);


      state[to] = [...state[to], taskToMove];
    },
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
