import React from "react";
import "src/styles/app.css";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function App() {

  return (
    <>
      <div>
      <p className="text-2xl mb-6">Liste des tâches</p>
        <TaskList />
      </div>
      <div>
        <AddTaskForm />
      </div>
    </>
  );
}

export default App;
