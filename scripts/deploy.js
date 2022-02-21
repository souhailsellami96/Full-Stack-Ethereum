const hre = require("hardhat");


async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );


  const Token = await hre.ethers.getContractFactory("SSToken");
  const token = await Token.deploy("Souhail Sellami Token","SST");

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
