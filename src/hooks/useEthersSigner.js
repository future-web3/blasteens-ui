import { providers } from 'ethers';
import * as React from 'react';

export function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner(walletClientData) {
  return React.useMemo(
    () => (walletClientData ? walletClientToSigner(walletClientData) : undefined),
    [walletClientData]
  );
}
