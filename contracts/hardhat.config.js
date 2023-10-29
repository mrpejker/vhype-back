/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { PRIVATE_KEY,  ARBITRUM_RPC_URL } = process.env;

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
    arbitrum: {
      url: ARBITRUM_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
  },
}