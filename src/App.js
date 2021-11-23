import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import TodoRewarder from "./artifacts/contracts/TodoRewarder.sol/TodoRewarder.json";

const todoRewarderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // TaskList that gets fetched
  const [fetchedTaskList, setFetchedTaskList] = useState({});

  //Task Initial Object
  const initialTaskState = {
    id: "",
    _name: "",
    _content: "",
    completed: false,
  };
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
        const data = await contract.getTaskList;
        console.log(data, "Hey this is the data i fetched");
      } catch (err) {
        console.log(err, "<- Error");
      }
    }
  }

  async function setUserTask() {
    console.log("Am i being clicked");
    if (!task._content || !task._name) return;
    if (typeof window.ethereum) {
      console.log("Do i go in here?");
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
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchTaskList}>Fetch Task List</button>
        <button onClick={setUserTask}>Set Task</button>
        <form>
          <label>
            Task Name
            <input
              type="text"
              name="_name"
              value={task._name}
              onChange={handleChange}
            />
          </label>
          <label>
            Task Description
            <input
              type="text"
              name="_content"
              value={task._description}
              onChange={handleChange}
            />
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
