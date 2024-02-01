const alchemyKey = process.env.REACT_APP_ALCHEMY_API_KEY || "";

export const networkConfig = {
  netId5: {
    gameTicketContract: "0x311ea6510B5cEFcd22E96A026aCe870455FaB8bd",
    gameLeaderBoardContract: "0x533798106BA364bBBeeEBE145B4f4b0dC829067A",
    forwarderContract: '0xF72Ab2B2796AC619b3171b81015DF76C92d34933',
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
    chainName: "goerli",
    currencyName: "gETH",
    fromBlock: 10309103,
    explorerUrl: {
      tx: "https://goerli.etherscan.io/tx/",
      address: "https://goerli.etherscan.io/address/",
      block: "https://goerli.etherscan.io/block/",
    },
    image:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
};
