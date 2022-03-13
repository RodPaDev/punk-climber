const { join } = require('path')
require('@nomiclabs/hardhat-waffle')
require('dotenv').config({ path: join(__dirname, '.env') })

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.WALLET_RINKEBY_KEY]
    }
  }
}
