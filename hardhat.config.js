require('@nomiclabs/hardhat-waffle')
require('hardhat-abi-exporter')
require('dotenv').config()

module.exports = {
  solidity: '0.8.9',
  networks: {
    klaytn: {
      url: "https://klaytn-mainnet-rpc.allthatnode.com:8551",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    baobab: {
      url: "https://klaytn-baobab-rpc.allthatnode.com:8551",
      accounts: [process.env.TEST_PRIVATE_KEY || ''],
    },
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
  },
};
