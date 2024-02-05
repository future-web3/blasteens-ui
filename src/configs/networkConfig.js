const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY || ''

export const networkConfig = {
  netId5: {
    gameTicketContract: '0x311ea6510B5cEFcd22E96A026aCe870455FaB8bd',
    gameLeaderBoardContract: '0x533798106BA364bBBeeEBE145B4f4b0dC829067A', //TODO:NO NEED THIS ANYMORE
    forwarderContract: '0xF72Ab2B2796AC619b3171b81015DF76C92d34933',
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainName: 'goerli',
    currencyName: 'gETH',
    fromBlock: 10309103,
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx/',
      address: 'https://goerli.etherscan.io/address/',
      block: 'https://goerli.etherscan.io/block/'
    },
    image: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628'
  },
  netId168587773: {
    gameTicketContract: '0x347723e76631759006F0bB7C0CEa608e73fEc48F',
    gameLeaderBoardContract: '0x533798106BA364bBBeeEBE145B4f4b0dC829067A', //TODO:NO NEED THIS ANYMORE
    gameContract: {
      escapeFromGerms: '0x92f07BA8650eee3564d95C1E083c8aa98FAC29Df',
      tommyJumping: '0x5D7E8082c02eEFdE0F36E59e5f72222F83ea10dd',
      snowmanDefender: '0xB967cC20De0417a4A9b386f70d18c783663E7047',
      emojiMatch: '0x4731b0c12B3e5C7704C8964388a918936Bf3A953'
    },
    forwarderContract: '0xB6A87320DE35F2bEFE2258162360daa3de11C788',
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainName: 'Blast Sepolia',
    currencyName: 'ETH',
    fromBlock: 1202089,
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx/',
      address: 'https://goerli.etherscan.io/address/',
      block: 'https://goerli.etherscan.io/block/'
    },
    image: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628'
  }
}
