const hre = require("hardhat");

async function main() {
  const TodoRewarder = await hre.ethers.getContractFactory("TodoRewarder");
  const todoRewarder = await TodoRewarder.deploy();

  await todoRewarder.deployed();

  console.log("TodoRewarder deployed to:", todoRewarder.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
