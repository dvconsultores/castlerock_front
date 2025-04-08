import { connect, keyStores, WalletConnection } from 'near-api-js';

type NearNetwork = 'testnet' | 'mainnet';

// Get the environment variable
const env: NearNetwork = (process.env.VITE_NEAR_NETWORK as NearNetwork) || 'testnet'; // Default to 'testnet' if not defined

const config: Record<NearNetwork, {
  networkId: string;
  keyStore: keyStores.BrowserLocalStorageKeyStore;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  explorerUrl: string;
}> = {
  testnet: {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  },
  mainnet: {
    networkId: 'mainnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.mainnet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
  },
};

// Validate the environment
if (!config[env]) {
  throw new Error(`Invalid NEAR network environment: ${env}`);
}

const nearConfig = config[env];

const nearPromise = connect(nearConfig).then((near) => {
  return new WalletConnection(near, 'app');
});

export { nearPromise as wallet };