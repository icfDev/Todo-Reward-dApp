import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./LandingForm.css";
import TodoRewarder from "../../artifacts/contracts/TodoRewarder.sol/TodoRewarder.json";
import { Row, Container, Form, Button } from "react-bootstrap";

const todoRewarderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function LandingForm() {
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
      <Container id="form-container">
        <Row className="form-container__row justify-content-center" lg={3}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                placeholder="Enter Task Name"
                type="text"
                name="_name"
                value={task._name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                placeholder="Enter Task Description"
                type="text"
                name="_content"
                value={task._content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Row>
        <div className="form-container__buttons">
          <Button
            className="form-container__button"
            variant="primary"
            type="submit"
            onClick={setUserTask}
          >
            Set Task
          </Button>
          <Button variant="primary" type="submit" onClick={fetchTaskList}>
            Fetch Tasks
          </Button>
          {console.log(task, "Task Status")}
        </div>
      </Container>
    </div>
  );
}

export default LandingForm;
