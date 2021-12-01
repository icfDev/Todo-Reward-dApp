import React from "react";

const TaskListDisplay = (fetchedTask) => {
  return (
    <div>
      <h5>
        {" "}
        {fetchedTask &&
          fetchedTask.fetchedTask &&
          fetchedTask.fetchedTask.name}{" "}
      </h5>
      <h5>
        {" "}
        {fetchedTask &&
          fetchedTask.fetchedTask &&
          fetchedTask.fetchedTask.content}{" "}
      </h5>
    </div>
  );
};

export default TaskListDisplay;
