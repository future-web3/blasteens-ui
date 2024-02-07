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
    gameTicketContract: '0x49c1B82ff813382BbCC3CAc05dc06a5F27DbeEe7',
    gameContract: {
      escapeFromGerms: '0x7cC1F4c0DFe5Ff02b2F9F9e347aABfcd092f41EB',
      tommyJumping: '0x1Dd61C06Ed6E5Fb83F90EacF30122fC449B393f2',
      snowmanDefender: '0x316622712FacA19c963d348446bF116de8A8A152',
      emojiMatch: '0x65AE86f6954121389eD01fF12f20E1AC89dbD9AB'
    },
    forwarderContract: '0xB6A87320DE35F2bEFE2258162360daa3de11C788',
    lottoContract: '0x7E97D71D46F13Ae7A6cd7a241f69175E34EDdF54',
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
