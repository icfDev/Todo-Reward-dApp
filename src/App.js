import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import TodoRewarder from "./artifacts/contracts/TodoRewarder.sol/TodoRewarder.json";

const todoRewarderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function requestAccount() {}

async function fetchTodos() {
  if (typeof window.ethereum !== "undefined") {
    // Provider allows a connection to the ethereum network and provides a read only access to the blockchain and its status.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // abstraction that allows conection to specific contract
    const contract = new ethers.contract(
      todoRewarderAddress,
      TodoRewarder.abi,
      provider
    );
    try {
      // const data = await contract.
    } catch (err) {
      console.log(Err, "<- Error");
    }
  }
}

async function setTodo() {}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
