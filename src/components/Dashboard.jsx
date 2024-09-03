import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { addTask, moveTask } from "../features/tasksSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { todo, doing, done } = useSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const from = source.droppableId;
    const to = destination.droppableId;

    dispatch(moveTask({ from, to, taskId: result.draggableId }));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ id: Date.now().toString(), text: newTask }));
      setNewTask("");
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl mb-4">Jira-like Dashboard</h1>
      <input
        type="text"
        className="border rounded p-2 mb-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white rounded p-2 mb-4"
      >
        Add Task
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {["todo", "doing", "done"].map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-lg p-4 w-80"
                >
                  <h2 className="text-xl mb-2 capitalize">{column}</h2>
                  {eval(column).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white border rounded p-2 mb-2"
                        >
                          {task.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
