import React from "react";
import "./TaskListDisplay.css";

const TaskListDisplay = ({ fetchedTask }) => {
  return (
    <div id="task__list-display">
      <div className="task__list-row">
        <div className="task__name-title">Task Name</div>
        <div className="task__name-content">{fetchedTask.name}</div>
        <div className="task__content-title">Task Description</div>
        <div className="task__content-description">{fetchedTask.content}</div>
      </div>
      {/* {console.log(fetchedTask, "This is my Fetched Task")}
      <h5> {fetchedTask && fetchedTask.name} </h5>
      <h5> {fetchedTask && fetchedTask.content} </h5> */}
    </div>
  );
};

export default TaskListDisplay;
