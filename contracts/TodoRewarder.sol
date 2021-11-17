//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract TodoRewarder {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    constructor(){
        createTask("This is a trial task! Check me out so you get a reward!");
    }

    mapping(uint => Task) public tasks;

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, true);
    }

    function getTask() public {}

}