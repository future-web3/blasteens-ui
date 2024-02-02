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
    gameContract: { escapeFromGerms: '0xabd251DCBcD6F9bCF3FE2680064f7A93Ff68D209' },
    forwarderContract: '0xB6A87320DE35F2bEFE2258162360daa3de11C788',
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainName: 'Blast Sepolia',
    currencyName: 'ETH',
    fromBlock: 10309103,
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx/',
      address: 'https://goerli.etherscan.io/address/',
      block: 'https://goerli.etherscan.io/block/'
    },
    image: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628'
  }
}
