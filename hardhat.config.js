require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // Define your networks here, such as "sepolia", "goerli", "mainnet", etc.
    // Example:
    sepolia: {
      url: "https://sepolia.infura.io/v3/619e6aa4012a4747a9ebd776e19d9ba4",
      accounts: [
        "0x179ab8cf6a2107c64c0e6a45bbf613ca4c5673b2abb86ab50a5057825710bd6d",
      ],
    },
  },
};


