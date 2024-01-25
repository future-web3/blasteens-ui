const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

export const networkConfig = {
  netId5: {
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
