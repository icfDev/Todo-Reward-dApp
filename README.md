# Todo Reward dApp

The following project provides a simple interface where users can create tasks and mark them as completed, these tasks will be written on the ethereum blockchain. As soon as a task gets marked as completed the user gets rewarded with "VVS" tokens.

## Components

These are the following tools which we will be using in order to complete the project

### 1. Ethereum Development Enviroment

The chosen tool for compiling, testing and deploying the smart contracts written in Solidity is Hardhat.

### 2. Front End Application

Theres a wide variety of framework/libraries which could of been chosen, in this case we'll be going with ReactJS for its simplicity.

### 4. Web Client Library

When it comes to the communication from the client side and the blockchain there are two main options, web3.js and ethers.js, in this case we'll be rolling with Ethers.js.

### 5. Metamask

Metamask provides great value as it facilitates not only users by providing them an interface but allows developers to be able to identify the users and interact with the Ethereum API. This toll will come in handy when interacting with the clientside.


## How will it work?

Upon the deployment of the project, all of the VVS tokens that are created will be given to the TodoReward contract so it can manage them( keep track of balanace and and sending out the token). The user from the client then will be able to create tasks, keep track of his tasks and be able to mark a task as completed which he will then be rewarded with VVS tokens. 

![Architecture](https://user-images.githubusercontent.com/20049210/141364765-955c35ba-c0a8-4f83-afc9-c460a4ccf54a.png)
