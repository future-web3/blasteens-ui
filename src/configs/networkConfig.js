export const networkConfig = {
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
    rpcUrl: `https://sepolia.blast.io`,
    chainName: 'Blast Sepolia',
    currencyName: 'ETH',
    fromBlock: 1294996,
    explorerUrl: {
      tx: 'https://testnet.blastscan.io/tx/',
      address: 'https://testnet.blastscan.io/address/',
      block: 'https://testnet.blastscan.io/block/'
    }
  }
}

export const PYTH_BASE_URL = 'https://fortuna-staging.pyth.network/v1/chains/blast-testnet/revelations'
