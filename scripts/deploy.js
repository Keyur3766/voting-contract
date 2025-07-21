const hre = require("hardhat");

async function main() {
    [chairPerson, voter1, voter2, voter3, voter4] = await ethers.getSigners();

    const VoterContract = await ethers.getContractFactory("VoterContract");
    voterContract = await VoterContract.connect(chairPerson).deploy();

    await voterContract.deployed();
    console.log(`Chair person: `, chairPerson.address);
    console.log(`Deployed Voter contract`);
    console.log(voterContract.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
