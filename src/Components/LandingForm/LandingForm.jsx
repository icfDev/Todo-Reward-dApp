import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./LandingForm.css";
import TodoRewarder from "../../artifacts/contracts/TodoRewarder.sol/TodoRewarder.json";
import LandingFormInput from "./LandingFormInput/LandingFormInput";
import TaskListDisplay from "./TaskListDisplay/TaskListDisplay";

const todoRewarderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function LandingForm() {
  //Task Initial Object
  const initialTaskState = {
    id: "",
    _name: "",
    _content: "",
    completed: false,
  };
  // TaskList that gets fetched
  const [fetchedTaskList, setFetchedTaskList] = useState([]);

  //Task State variable
  const [task, setTask] = useState(initialTaskState);

  //OnChange function
  function handleChange(evt) {
    const value = evt.target.value;
    setTask({
      ...task,
      [evt.target.name]: value,
    });
  }

  //Enable account to be used and connected
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchTaskList() {
    console.log("am i being clicked");
    if (typeof window.ethereum !== "undefined") {
      // Provider allows a connection to the ethereum network and provides a read only access to the blockchain and its status.
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // abstraction that allows conection to specific contract
      const contract = new ethers.Contract(
        todoRewarderAddress,
        TodoRewarder.abi,
        provider
      );
      try {
        const data = await contract.getTaskList();
        console.log(data, "This is the data");
        setFetchedTaskList(data);
      } catch (err) {
        console.log(err, "<- Error");
      }
    }
  }

  async function setUserTask() {
    console.log("SetUserTask i. Clicked");
    if (!task._content || !task._name) return;
    if (typeof window.ethereum) {
      console.log(
        "SetUserTask ii. Inside if window ethereum",
        task._name,
        task._content
      );
      await requestAccount();
      //New provider that writes to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Since we are going to update we need a way to create a transaction and we need a signer for that
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        todoRewarderAddress,
        TodoRewarder.abi,
        signer
      );
      const transaction = await contract.setTask(task._content, task._name);
      setTask(initialTaskState);
      await transaction.wait();
      fetchTaskList();
      console.log(fetchedTaskList, "Fetched task list");
    }
  }

  return (
    <div className="LandingForm">
      <LandingFormInput
        handleChange={handleChange}
        setUserTask={setUserTask}
        fetchTaskList={fetchTaskList}
        _name={task._name}
        _content={task._content}
      />
      {fetchedTaskList
        ? fetchedTaskList.map((fetchedTask) => (
            <TaskListDisplay fetchedTask={fetchedTask} />
          ))
        : ""}
    </div>
  );
}

export default LandingForm;
