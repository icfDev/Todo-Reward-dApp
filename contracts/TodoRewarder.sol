//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract TodoRewarder {
    // Where we record information.
    struct Task {
        uint id;
        string name;
        string content;
        bool completed;
    }

    constructor(){}

    //Every address has an array of listIds()
    mapping(address => uint[]) public userTaskIds;

    //Mapping of address to task
    mapping( address => Task[]) public userTaskList;

    //Setting the task to the blockchain
    function setTask (string memory _content, string memory _name) public returns (bool success){
        console.log("This is my content",_content, "this is my name",_name);
        if(userTaskIds[msg.sender].length == 0){
            console.log("Do i go in here");
            userTaskList[msg.sender].push(Task(0,_name,_content,false));
            userTaskIds[msg.sender].push(0);
            return true;
        } 
        console.log("I guess my length isnt 0?");
        // Checking the last latest value of my array containing the id's of the task.
        uint lastItem = userTaskIds[msg.sender][userTaskIds[msg.sender].length - 1];
        // Setting the values on the blockchain
        userTaskList[msg.sender].push(Task(lastItem+1,_name,_content,false));
        //Upadting userTaskId array of the user
        userTaskIds[msg.sender].push(lastItem+1);
        return true;
    }

    function getTaskList () public view returns(Task[] memory _taskList) {
        return userTaskList[msg.sender];
    }

}