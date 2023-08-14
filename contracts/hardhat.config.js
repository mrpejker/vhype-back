/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { PRIVATE_KEY, MUMBAI_RPC_URL, COLUMBUS_RPC_URL } = process.env;

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    },
  },
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    mumbai: {
      url: MUMBAI_RPC_URL,
      chainId: 80001,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    columbus: {
      url: COLUMBUS_RPC_URL,
      chainId: 501,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
  },
}