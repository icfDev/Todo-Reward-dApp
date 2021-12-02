import React from "react";
import { Row, Container } from "react-bootstrap";
import "./TaskListDisplay.css";

const TaskListDisplay = ({ fetchedTask }) => {
  return (
    <div id="task__list__container">
      <div>Hi</div>
      {/* {console.log(fetchedTask, "This is my Fetched Task")}
      <h5> {fetchedTask && fetchedTask.name} </h5>
      <h5> {fetchedTask && fetchedTask.content} </h5> */}
    </div>
  );
};

export default TaskListDisplay;
