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
    gameTicketContract: '0xC88c10CC9A18c713e19BA5807E2659FBb98A893A',
    gameContract: {
      escapeFromGerms: '0xC1BCaA3597a14c7c05334ba9f0C338c3c8a7eA2b',
      tommyJumping: '0xaABc608c625DaE23Fb13b37cdDf67E186eC2A1c4',
      snowmanDefender: '0xC4409E4CDDcB857ebdD70f81EE6EF1aB3Ce96d4e',
      emojiMatch: '0xb386E9D436050C8fa71e8DfA9e0938c014fEDdBb'
    },
    forwarderContract: '0xB6A87320DE35F2bEFE2258162360daa3de11C788',
    lottoContract: '0xd46807E42528AAe601131235Cea22Cf4fe205A78',
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainName: 'Blast Sepolia',
    currencyName: 'ETH',
    fromBlock: 1294996,
    explorerUrl: {
      tx: 'https://goerli.etherscan.io/tx/',
      address: 'https://goerli.etherscan.io/address/',
      block: 'https://goerli.etherscan.io/block/'
    },
    image: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628'
  }
}
