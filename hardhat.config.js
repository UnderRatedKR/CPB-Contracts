require('@nomiclabs/hardhat-waffle')
require('hardhat-abi-exporter')
require('dotenv').config()

module.exports = {
  solidity: '0.8.9',
  networks: {
    baobab: {
      url: 'https://public-node-api.klaytnapi.com/v1/baobab',
      accounts: [process.env.PRIVATE_KEY || ''],
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